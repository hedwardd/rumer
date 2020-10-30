require("dotenv").config();

const mongoose = require("mongoose");
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

const request = require("supertest");
const app = require("../app/app.js");

describe("Test the root path", () => {
	test("It should test the response of the GET method", done => {
		request(app)
			.get("/api/passwords")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});

	test("It should test the response of the GET method for /api/passwords", done => {
		request(app)
			.get("/api/passwords")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});

describe("Test the endpoints with a DB connection", () => {
	beforeAll(done => {
		mongoose.connect(process.env.MONGO_URI,
			dbOptions,
			(err) => {
				if (err) {
					console.error("Database error: " + err);
				}
				else {
					console.log("DB connected.");
				}
				done();
			});
	});
	
	afterAll((done) => {
		
		mongoose.disconnect(process.env.MONGO_URI,
			dbOptions,
			(err) => {
				if (err) {
					console.error("Database disconnection error: " + err);
					done();
				}
				else {
					console.log("DB disconnected.");
					done();
				}
			});
		
	});

	test("It should response the POST method for /api/listings", done => {
		request(app)
			.post("/api/listings")
			.send({title: "example title"})
			.then(response => {
				console.log(response.body);
				expect(response.statusCode).toBe(200);
				// console.log(response.body);
				done();
			});
	});



	
});