/**
 * Libraries
 */
const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");
const mongoose = require("mongoose");
const { Listing, User, Booking } = require("./models.js");

/**
 * Declarations
 */
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

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


/**
 * Route Setter
 */
const setRoutes = (app) => {

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

	app.route("/api/listing")
		.post(postListing);

	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname+"/client/build/index.html"));
	});

};


module.exports = (app) => {

	mongoose.connect(process.env.MONGO_URI,
		dbOptions,
		(err) => {
			if (err) console.error("Database error: " + err);
			else setRoutes(app);
			console.log("it's alive!");
		});

};