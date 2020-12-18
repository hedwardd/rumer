const request = require('supertest');
const mongoDB = require('./mongoDB.js');
const app = require('../app/api.js');

describe('Test the root path', () => {
  test('It should test the response of the GET method', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }));
});

describe('Test the endpoints with a DB connection', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  // eslint-disable-next-line jest/no-done-callback
  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  describe('POST /api/listings with title => create listing object/expect listing object', () => {
    test('POST /api/listings with no title', () => request(app)
      .post('/api/listings')
      .send({})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('missing title');
      }));

    test('POST /api/listings with title', () => request(app)
      .post('/api/listings')
      .send({ title: 'example title' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      }));
  });

  describe('GET /api/listings with title => get listing objects/expect listing objects', () => {
    test('GET /api/listings', () => request(app)
      .get('/api/listings')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(typeof (response.body[0].title)).toBe('string');
        expect(response.body[0]).toHaveProperty('photoURLs');
      }));
  });

  describe('POST /api/booking with _associatedListing, checkin, and checkout dates => get booking object/expect booking object', () => {
    test('POST /api/booking with no associated listing', () => {
      const bookingObject = {
        checkIn: new Date(),
        checkOut: new Date(),
      };
      return request(app)
        .post('/api/bookings')
        .send(bookingObject)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.text).toBe('Error: Missing parameter.');
        });
    });

    // test("POST /api/booking with no checkin date", () => {
    //   let bookingObject = {
    //     checkOut: new Date(),
    //     _associatedListing: "5f9afc0da082386017b8162a"
    //   };
    //   return request(app)
    //     .post("/api/bookings")
    //     .send(bookingObject)
    //     .then(response => {
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBe("Missing parameter");
    //     });
    // });

    // test("POST /api/booking with no checkout date", () => {
    //   let bookingObject = {
    //     checkIn: new Date(),
    //     _associatedListing: "5f9afc0da082386017b8162a"
    //   };
    //   return request(app)
    //     .post("/api/bookings")
    //     .send(bookingObject)
    //     .then(response => {
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBe("Missing parameter");
    //     });
    // });

    // test("POST /api/booking with conflicting checkin date", () => {
    //   let bookingObject = {
    //     checkOut: new Date(),
    //     _associatedListing: "5f9afc0da082386017b8162a"
    //   };
    //   return request(app)
    //     .post("/api/bookings")
    //     .send(bookingObject)
    //     .then(response => {
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBe("Missing parameter");
    //     });
    // });

    // test("POST /api/booking with conflicting checkout date", () => {
    //   let bookingObject = {
    //     checkOut: new Date(),
    //     _associatedListing: "5f9afc0da082386017b8162a"
    //   };
    //   return request(app)
    //     .post("/api/bookings")
    //     .send(bookingObject)
    //     .then(response => {
    //       expect(response.statusCode).toBe(200);
    //       expect(response.text).toBe("Missing parameter");
    //     });
    // });

    // TO-DO: Make sure this gets a real `_associatedListing` before testing
    test('POST /api/booking with associated listing, checkin, and checkout dates', () => {
      const bookingObject = {
        checkIn: new Date(),
        checkOut: new Date(),
        _associatedListing: '5f9afc0da082386017b8162a',
      };
      return request(app)
        .post('/api/bookings')
        .send(bookingObject)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe('GET /api/bookings/:listingId => get booking objects/expect booking objects', () => {
    test('GET /api/bookings/:listingId', () => {
      const listingId = '5f9afc0da082386017b8162a';
      return request(app)
        .get(`/api/bookings/${listingId}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body[0]).toHaveProperty('_associatedListing');
          expect(response.body[0]).toHaveProperty('checkIn');
          expect(response.body[0]).toHaveProperty('checkOut');
          // TO-DO: Ensure that the bookings have a VALID date
          // expect(typeof(response.body[0].checkIn)).toBe("date");
          // expect(typeof(response.body[0].checkOut)).toBe("date");
        });
    });
  });
});
