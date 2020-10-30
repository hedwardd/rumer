/**
 * Libraries
 */
const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");
// const mongoose = require("mongoose");
const { Listing, User, Booking } = require("./models.js");


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


/**
 * Route Setter
 */
module.exports = (app) => {

	// Serve static files from the React app
	app.use(express.static(path.join(__dirname, "../client/build")));

	// Put all API endpoints under '/api'
	app.get("/api/passwords", (req, res) => {
		const count = 5;

		// Generate some passwords
		const passwords = Array.from(Array(count).keys()).map(() =>
			generatePassword(12, false)
		);

		// Return them as json
		res.json(passwords);

		console.log(`Sent ${count} passwords`);
	});

	app.route("/api/listings")
		.get(getListings)
		.post(postListing);

	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname+"/client/build/index.html"));
	});

};


// module.exports = { setRoutes };