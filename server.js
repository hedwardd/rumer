require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app/api.js");

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

mongoose.connect(process.env.MONGO_URI,
	dbOptions,
	(err) => {
		if (err) console.error("Database error: " + err);
		else {
			const port = process.env.PORT || 5000;
			app.listen(port);

			console.log(`App listening on ${port}`);
		}
	}
);