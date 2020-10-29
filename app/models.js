/**
 * Libraries
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schemas and Models
 */
const userSchema = new Schema(
	{
		name: { type: String, required: true },
		_associatedListings: [Schema.Types.ObjectId],
		_associatedBookings: [Schema.Types.ObjectId]
	}
);
const User = mongoose.model("User", userSchema);

const listingSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		photoURLs: [ { type: String } ],
		address: {
			street1: { type: String, lowercase: true, trim: true },
			street2: { type: String, lowercase: true, trim: true },
			city: { type: String, lowercase: true, trim: true },
			zip: { type: String, trim: true, match: /^\d{5}$/ },
			state: { type: String, lowercase: true, trim: true, minlength: 2, maxlength: 2 },
		},
		description: { type: String, trim: true }
	}
);
const Listing = mongoose.model("Listing", listingSchema);

const bookingSchema = new Schema(
	{
		checkIn: Date,
		checkOut: Date,
		_associatedListing: Schema.Types.ObjectId
	}
);
const Booking = mongoose.model("Booking", bookingSchema);


module.exports = { Listing, User, Booking };