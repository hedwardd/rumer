const request = require('supertest');
const mongoDB = require('./mongoDB.js');
const app = require('../app/index.js');

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

  describe('GET /api/listings => get listing objects/expect listing objects', () => {
    test('GET /api/listings', () => request(app)
      .get('/api/listings')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(typeof (response.body[0])).toBe('object');
        expect(response.body[0]).toHaveProperty('_id');
        expect(typeof (response.body[0]._id)).toBe('string');
        expect(response.body[0]).toHaveProperty('title');
        expect(typeof (response.body[0].title)).toBe('string');
        expect(response.body[0]).toHaveProperty('address');
        expect(typeof (response.body[0].address)).toBe('object');
        expect(response.body[0].address).toHaveProperty('street1');
        expect(typeof (response.body[0].address.street1)).toBe('string');
        expect(response.body[0].address).toHaveProperty('street2');
        expect(typeof (response.body[0].address.street2)).toBe('string');
        expect(response.body[0].address).toHaveProperty('city');
        expect(typeof (response.body[0].address.city)).toBe('string');
        expect(response.body[0].address).toHaveProperty('zip');
        expect(typeof (response.body[0].address.zip)).toBe('string');
        expect(response.body[0].address).toHaveProperty('state');
        expect(typeof (response.body[0].address.state)).toBe('string');
        expect(response.body[0]).toHaveProperty('description');
        expect(typeof (response.body[0].description)).toBe('string');
        expect(response.body[0]).toHaveProperty('photoURLs');
        expect(Array.isArray(response.body[0].photoURLs)).toBe(true);
        expect(typeof (response.body[0].photoURLs[0])).toBe('string');
        expect(response.body[0]).toHaveProperty('_hostUser');
        expect(typeof (response.body[0]._hostUser)).toBe('string');
        expect(response.body[0].isArchived).not.toBe(true);
      }));
  });

  describe('GET /api/bookings/:listingId => get booking objects/expect booking objects', () => {
    test('GET /api/bookings/:listingId', () => {
      const listingId = '5ff75bba4b7f150aced66b3f';
      return request(app)
        .get(`/api/bookings/${listingId}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(Array.isArray(response.body)).toBe(true);
          expect(typeof (response.body[0])).toBe('object');
          expect(response.body[0]).toHaveProperty('_associatedListing');
          expect(typeof (response.body[0]._associatedListing)).toBe('string');
          expect(response.body[0]).toHaveProperty('checkIn');
          const { checkIn } = response.body[0];
          expect(typeof (checkIn)).toBe('string');
          const checkInDate = new Date(checkIn);
          expect(checkInDate.valueOf()).not.toBeNaN();
          expect(response.body[0]).toHaveProperty('checkOut');
          const { checkOut } = response.body[0];
          const checkOutDate = new Date(checkOut);
          expect(typeof (checkOut)).toBe('string');
          expect(checkOutDate.valueOf()).not.toBeNaN();
          // NICE-TO-HAVE: Ensure that the checkIn date is before the checkOut date
        });
    });
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
});
