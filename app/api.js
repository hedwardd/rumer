/**
 * Libraries
 */
const express = require("express");
const path = require("path");
const { User, Listing, Booking } = require("./models.js");
const bodyParser = require("body-parser");

/**
 * Declarations
 */
const app = express();
app.use(bodyParser.json());

/**
 * Route Handlers
 */
const postListing = (req, res) => {
	if (!req.body.title) res.send("missing title");
	else {
		let title = req.body.title;
		let newListing = new Listing({ title: title });
		newListing.save((err, savedListing) => {
			if (err) {
				console.error(err);
				res.send("could not save listing");
			} else res.json(savedListing);
		});
	}
};

const getListings = (req, res) => {
	Listing.find({}, "-__v -_id", (err, foundListings) => {
		if (err) {
			console.error(err);
			res.send("Could not GET listings");
		} else res.json(foundListings);
	});
};

const postBooking = (req, res) => {
	let _associatedListing = req.body._associatedListing;
	let checkIn = req.body.checkIn;
	let checkOut = req.body.checkOut;
	if (!(_associatedListing && checkIn && checkOut)) {
		console.error("Error: Missing parameter.");
		res.send("Error: Missing parameter.");
	} else {
		let newBooking = new Booking({
			_associatedListing: _associatedListing,
			checkIn: checkIn,
			checkOut: checkOut
		});
		// Confirm there is a listing with that ID.
		Listing.findOne(
			{ _id: _associatedListing },
			(err, foundListing) => {
				if (err) {
					console.error(err);
					res.send("Error searching for listing with that ID."); // Do 0 results send an error?
				} else {
					// Confirm there are no conflicting bookings
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
								if (foundBookings.length > 0) {
									console.error("Error: found conflicting bookings: " + foundBookings);
									res.send("Error: found conflicting bookings.");
								} else {
									newBooking.save((err, savedBooking) => {
										if (err) {
											console.error(err);
											res.send("Could not save booking");
										} else res.json(savedBooking);
									});
								}
							}
						});
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
			{ _associatedListing: _associatedListing },
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


/**
 * Routes
 */
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Put all API endpoints under '/api'
app.route("/api/listings")
	.get(getListings)
	.post(postListing);


app.route("/api/bookings/:listingId")
	.get(getBookingsByListing);

app.route("/api/bookings")
	.post(postBooking);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname+"/client/build/index.html"));
});


module.exports = app;