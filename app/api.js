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
		// console.log("Authentication failed.");
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

const getListings = (req, res) => {
	Listing.find({}, "-__v", (err, foundListings) => {
		if (err) {
			console.error(err);
			res.send("Could not GET listings");
		} else res.json(foundListings);
	});
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
	let _hostUser = req.params.hostId;
	Listing.find({ _hostUser: _hostUser }, "-__v", (err, foundListings) => {
		if (err) {
			console.error(err);
			res.send("Error finding listings with that host.");
		} else res.json(foundListings);
	});
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

						// TO-DO: Confirm there are no conflicting bookings
						// let thisCheckIn = req.body.checkIn;
						// let thisCheckOut = req.body.checkOut;
						// Booking
						// 	.find({ _associatedListing: foundListing })
						//	.or([{ checkIn: { $gte: ourCheckOut }, checkOut: { $lte: ourCheckIn } }])
						Booking.find(
							{
								_associatedListing: foundListing,
								checkIn: { $gte: checkOut },
								checkOut: { $lte: checkIn }
							},
							"-__v -_id",
							(err, foundBookings) => {
								if (err) {
									console.error(err);
									res.send("Error searching for conflicting bookings.");
								} else {
									// console.log(foundBookings);
									if (foundBookings.length) {
										console.error("Error: found conflicting bookings: " + foundBookings);
										res.send("Error: found conflicting bookings.");
									} else {
										newBooking.save((err, savedBooking) => {
											if (err) {
												console.error(err);
												res.send("Could not save booking");
											} else {
												res.json(savedBooking);
											}
										});
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
			"-__v -_id",
			(err, foundBookings) => {
				if (err) {
					console.error(err);
					res.send("Could not get bookings");
				} else res.json(foundBookings);
			}
		);
	}
};

const getBookingsByUser = (req, res) => {
	let _guestUser = req.user._id;
	Booking.find(
		{ _guestUser }, // Does this work??
		(err, foundBookings) => {
			if (err) {
				console.error(err);
				res.send("Could not get bookings");
			} else res.json(foundBookings);
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

app.route("api/listings/host/:hostId")
	.get(ensureAuthenticated, getListingsByHost);

// app.route("/api/bookings/listing/:listingId")
// 	.get(getBookingsByListing);

app.route("/api/myBookings")
	.get(ensureAuthenticated, getBookingsByUser);

app.route("/api/bookings")
	.post(postBooking);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = app;