const mongoDB = require("./mongoDB.js");
const request = require("supertest");
const app = require("../app/app.js");

describe("Test the root path", () => {
	test("It should test the response of the GET method", () => {
		return request(app)
			.get("/api/passwords")
			.then(response => {
				expect(response.statusCode).toBe(200);
			});
	});

	test("It should test the response of the GET method for /api/passwords", () => {
		return request(app)
			.get("/api/passwords")
			.then(response => {
				expect(response.statusCode).toBe(200);
			});
	});
});

describe("Test the endpoints with a DB connection", () => {

	beforeAll(() => {
		mongoDB.connect();
	});
	
	// eslint-disable-next-line jest/no-done-callback
	afterAll(done => {
		mongoDB.disconnect(done);
	});

	describe("POST /api/listings with title => create listing object/expect listing object", () => {
		test("POST /api/listings with no title", () => {
			return request(app)
				.post("/api/listings")
				.send({})
				.then(response => {
					expect(response.statusCode).toBe(200);
					expect(response.text).toBe("missing title");
				});
		});

		test("POST /api/listings with title", () => {
			return request(app)
				.post("/api/listings")
				.send({title: "example title"})
				.then(response => {
					expect(response.statusCode).toBe(200);
				});
		});
	});

	describe("GET /api/listings with title => get listing objects/expect listing objects", () => {
		test("GET /api/listings", () => {
			return request(app)
				.get("/api/listings")
				.then(response => {
					expect(response.statusCode).toBe(200);
					expect(typeof(response.body[0].title)).toBe("string");
					expect(response.body[0]).toHaveProperty("photoURLs");
				});
		});
	});

});