const express = require('express');
const path = require('path');
const passport = require('passport');
const {
  registerNewUser,
  ensureAuthenticated,
  postListing,
  getListings,
  getListingById,
  getListingsByHost,
  toggleListingArchival,
  postBooking,
  getBookingsByListing,
  getBookingsForGuest,
  getBookingsForHost,
} = require('./handlers');

module.exports = (app) => {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.route('/api/login')
    .post(passport.authenticate('local'), (req, res) => {
      res.json({
        success: 'Welcome back!',
        user: { username: req.user.username },
      });
    });

  app.route('/api/auth')
    .get(ensureAuthenticated, (req, res) => {
      if (req.user) {
        res.json({
          success: true,
          message: 'User has successfully authenticated',
          user: req.user,
          cookies: req.cookies,
        });
      }
    });

  app.route('/api/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  app.route('/api/user')
    .post(registerNewUser);

  app.route('/api/listings')
    .get(getListings)
    .post(ensureAuthenticated, postListing);

  app.route('/api/listings/:listingId')
    .get(getListingById)
    .put(ensureAuthenticated, toggleListingArchival);

  app.route('/api/host/listings/')
    .get(ensureAuthenticated, getListingsByHost);

  app.route('/api/bookings/:listingId')
    .get(getBookingsByListing);

  app.route('/api/bookings')
    .post(ensureAuthenticated, postBooking);

  app.route('/api/myBookings')
    .get(ensureAuthenticated, getBookingsForGuest);

  app.route('/api/host/bookings/')
    .get(ensureAuthenticated, getBookingsForHost);

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
};
