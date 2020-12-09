/**
 * Libraries
 */
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const { User, Listing, Booking } = require("./models.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const areIntervalsOverlapping = require("date-fns/areIntervalsOverlapping");

/**
 * Declarations
 */
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne(
			{ username: username },
			async (err, user) => {
				// console.log("User " + username + " attempted to log in.");
				if (err) {
					console.error(err);
					return done(err);
				}
				if (!user) {
					// console.log("No such user found.");
					return done(null, false);
				}
				if (!await bcrypt.compare(password, user.password)) { // Original: if(password !== user.password) {
					// console.log("Password is incorrect.");
					return done(null, false);
				}
				// console.log("User has been authenticated.");
				return done(null, user);
			}
		);
	})
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findOne(
		{_id: id},
		"-password",
		(err, foundUser) => {
			done(null, foundUser);
		}
	);
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Route Handlers
 */
const registerNewUser = (req, res) => {
	User.findOne({ username: req.body.username }, async (err, foundUser) => {
		if (err) {
			console.error(err);
			res.send("There was an error checking for existing users.");
		}
		else if (foundUser) {
			console.log("Existing user found.");
			res.send("There is already a user with that username.");
		}
		else {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new User({
				username: req.body.username,
				password: hashedPassword
			});
			newUser.save((err, savedUser) => {
				if (err) {
					console.error(err);
					res.send("Error saving new user.");
				} else {
					console.log("Successfully created new user: " + savedUser.username);
					res.json({ success: "Registered successfully!" });
				}
			});
		}
	});
};

let ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.send("Authentication failed.");
	}
};

// TO-DO: Add server-side validation to form values
const postListing = (req, res) => {
	if (!req.body.title) res.send("missing title");
	else {
		let { title, street1, street2, city, zip, state, description, photoURLs } = req.body;
		let _hostUser = req.user._id;
		let newListing = new Listing({ 
			title,
			photoURLs,
			address: {
				street1,
				street2,
				city,
				zip,
				state
			},
			description,
			_hostUser
		});
		newListing.save((err, savedListing) => {
			if (err) {
				console.error(err);
				res.send("could not save listing");
			} else res.json(savedListing);
		});
	}
};

const getListingsByAvailability = (req, res) => {
	const { checkIn, checkOut } = req.query;
	if ((checkIn || checkOut) && (!(checkIn && checkOut))) {
		console.error("Query missing required parameter.");
		res.send("Error: Query requires both checkIn and checkOut parameters.");
	// TO-DO: Make sure valid dates can be parsed from query params
	} else {
		const checkInParam = new Date(parseInt(checkIn));
		const checkOutParam = new Date(parseInt(checkOut));
		// Get all future bookings
		// NICE-TO-HAVE: Refactor to not query all future bookings
		Booking.find(
			{checkOut: {$gte: new Date()}},
			(err, foundBookings) => {
				if (err) {
					console.error(err);
					res.send("Error: Could not retrieve bookings.");
				} else {
					const desiredInterval = { start: checkInParam, end: checkOutParam };
					// TO-DO: Refactor next two lines into one reduce method
					const conflictingBookings = foundBookings.filter(eachBooking => areIntervalsOverlapping(
						desiredInterval,
						{ start: eachBooking.checkIn, end: eachBooking.checkOut }
					));
					const listingsToFilter = conflictingBookings.map(eachBooking => eachBooking._associatedListing);
					Listing.find({ _id: { $nin: listingsToFilter } }, "-__v", (err, foundListings) => {
						if (err) {
							console.error(err);
							res.send("Could not GET filtered listings");
						} else {
							res.json(foundListings);
						}
					});
				}
			});
	}
};


const getListings = (req, res) => {
	if (req.query.checkIn || req.query.checkOut) (getListingsByAvailability(req, res));
	else {
		Listing.find({}, "-__v", (err, foundListings) => {
			if (err) {
				console.error(err);
				res.send("Could not GET listings");
			} else res.json(foundListings);
		});
	}
};

const getListingById = (req, res) => {
	let listingId = req.params.listingId;
	Listing.findOne({ _id: listingId }, "-__v", (err, foundListing) => {
		if (err) {
			console.error(err);
			res.send("Error finding listing with that ID");
		} else res.json(foundListing);
	});
};

const getListingsByHost = (req, res) => {
	let _hostUser = req.user._id;
	if (!_hostUser) res.send("missing title");
	else {
		Listing.find({ _hostUser: _hostUser }, "-__v", (err, foundListings) => {
			if (err) {
				console.error(err);
				res.send("Error finding listings with that host.");
			} else res.json(foundListings);
		});
	}
};


const postBooking = (req, res) => {
	let { _associatedListing, checkIn, checkOut } = req.body;
	let _guestUser = req.user._id;
	let dateNow = new Date();
	let dateCheckIn = new Date(checkIn);
	let dateCheckOut = new Date(checkOut);
	if (!(_associatedListing && checkIn && checkOut && _guestUser)) {
		console.error("Error: Missing parameter.");
		res.send("Error: Missing parameter.");
	} else if (dateCheckIn < dateNow || dateCheckOut < dateNow) {
		console.log("Booking failed because checkIn or checkOut is in the past.");
		res.send("Error: Bookings must be made at least 24 hours prior to check-in.");
	} else if (checkOut < checkIn) {
		console.log("Booking failed because checkOut before checkIn.");
		res.send("Error: Check-out cannot be before check-in.");
	} else {
		let newBooking = new Booking({
			_associatedListing,
			checkIn,
			checkOut,
			_guestUser
		});

		// Confirm there is a listing with that ID.
		Listing.findOne(
			{ _id: _associatedListing },
			(err, foundListing) => {
				if (err) {
					console.error(err);
					res.send("Error searching for listing with that ID."); // Do 0 results send an error?
				} else {

					// Check if host is the same as the guest.
					if (foundListing._hostUser.toString() == _guestUser.toString()) {
						console.log("Booking failed because guest is same as listing host.");
						res.send("Error: Host cannot book own listing.");
					} else {
						// Confirm there are no conflicting bookings already on this listing
						Booking.find(
							{ _associatedListing: foundListing },
							"-__v -_id",
							(err, foundBookings) => {
								if (err) {
									console.error(err);
									res.send("Error searching for conflicting bookings.");
								} else {
									if (!foundBookings.length) {
										// If there no other bookings on listing, save booking
										newBooking.save((err, savedBooking) => {
											if (err) {
												console.error(err);
												res.send("Could not save booking");
											} else {
												res.json(savedBooking);
											}
										});
									} else {
										// If there are bookings, make sure they don't conflict with this one
										let thisBookingInterval = { start: dateCheckIn, end: dateCheckOut };
										// First, map all other bookings into date intervals
										let otherBookingIntervals = foundBookings
											.map(booking => ({ start: new Date(booking.checkIn), end: new Date(booking.checkOut) }));
										// Next, check each to our proposed interval
										if (otherBookingIntervals.every(eachInterval => !areIntervalsOverlapping(eachInterval, thisBookingInterval))) {
											// If there are no conflicts, save and send back the new booking
											newBooking.save((err, savedBooking) => {
												if (err) {
													console.error(err);
													res.send("Could not save booking");
												} else {
													res.json(savedBooking);
												}
											});
										} else {
											// If a conflict is found, respond back with error message.
											console.error("Error: found conflicting bookings: " + foundBookings);
											res.send("Error: found conflicting bookings.");
										}
									}
								}
							}
						);

					}
				}
			}
		);
	}
};

// TO-DO: Finish and write tests for this endpoint
const getBookingsByListing = (req, res) => {
	let _associatedListing = req.params.listingId;
	if (!_associatedListing) {
		res.send("Error: Missing listingId");
	} else {
		Booking.find(
			{ _associatedListing },
			"-__v -_id -_guestUser",
			(err, foundBookings) => {
				if (err) {
					console.error(err);
					res.send("Could not get bookings");
				} else res.json(foundBookings);
			}
		);
	}
};

const getBookingsByGuest = (req, res) => {
	let _guestUser = req.user._id;
	Booking.find(
		{ _guestUser },
		(err, foundBookings) => {
			if (err) {
				console.error(err);
				res.send("Could not get bookings");
			} else res.json(foundBookings);
		}
	);
};

const getBookingsByHost = (req, res) => {
	const _hostUser = req.user._id;
	Listing.find(
		{ _hostUser },
		(err, foundListings) => {
			if (err) {
				console.error(err);
				res.send("Could not get listings");
			} else {
				if (foundListings.length === 0) {
					res.json({});
				} else {
					// Get IDs of Listings
					const listingIds = foundListings.map(thisListing => thisListing._id);
					// Search for bookings by those IDs
					Booking.find(
						{_associatedListing: { $in: listingIds }},
						(err, foundBookings) => {
							if (err) {
								console.error(err);
								res.send("Could not get bookings");
							} else res.json(foundBookings);
						}
					);
				}
			}
		}
	);
};

/**
 * Routes
 */
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Put all API endpoints under '/api'
app.route("/api/login")
	.post(passport.authenticate("local"), (req, res) => {
		res.json({
			success: "Welcome back!",
			user: req.user
		});
	});

app.route("/api/auth")
	.get(ensureAuthenticated, (req, res) => {
		if (req.user) {
			res.json({
				success: true,
				message: "User has successfully authenticated",
				user: req.user,
				cookies: req.cookies
			});
		}
	});

app.route("/api/logout")
	.get((req, res) => {
		req.logout();
		res.redirect("/");
	});

app.route("/api/user")
	.post(registerNewUser);
	
app.route("/api/listings")
	.get(getListings)
	.post(ensureAuthenticated, postListing);

app.route("/api/listings/:listingId")
	.get(getListingById);

app.route("/api/host/listings/")
	.get(ensureAuthenticated, getListingsByHost);

app.route("/api/bookings/:listingId")
	.get(getBookingsByListing);

app.route("/api/bookings")
	.post(postBooking);

app.route("/api/myBookings")
	.get(ensureAuthenticated, getBookingsByGuest);

app.route("/api/host/bookings/")
	.get(ensureAuthenticated, getBookingsByHost);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = app;