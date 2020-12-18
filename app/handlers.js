/* eslint-disable no-console */
const areIntervalsOverlapping = require('date-fns/areIntervalsOverlapping');
const bcrypt = require('bcrypt');
const { User, Listing, Booking } = require('./models.js');

const registerNewUser = (req, res) => {
  User.findOne({ username: req.body.username }, async (errFindingUser, foundUser) => {
    if (errFindingUser) {
      console.error(errFindingUser);
      res.json({ error: 'There was an error checking for existing users.' });
    } else if (foundUser) {
      res.json({ error: 'There is already a user with that username.' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      newUser.save((errSavingUser) => {
        if (errSavingUser) {
          console.error(errSavingUser);
          res.json({ error: 'Error saving new user.' });
        } else {
          res.json({ success: 'Registered successfully!' });
        }
      });
    }
  });
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.json({ error: 'Authentication failed.' });
};

// TO-DO: Add server-side validation to form values
const postListing = (req, res) => {
  if (!req.body.title) res.json({ error: 'missing title' });
  else {
    const {
      title, street1, street2, city, zip, state, description, photoURLs,
    } = req.body;
    const _hostUser = req.user._id;
    const newListing = new Listing({
      title,
      photoURLs,
      address: {
        street1,
        street2,
        city,
        zip,
        state,
      },
      description,
      _hostUser,
    });
    newListing.save((err, savedListing) => {
      if (err) {
        console.error(err);
        res.json({ error: 'could not save listing' });
      } else res.json(savedListing);
    });
  }
};

const getListingsByAvailability = (req, res) => {
  const { checkIn, checkOut } = req.query;
  const userId = req.user ? req.user._id : null;
  if ((checkIn || checkOut) && (!(checkIn && checkOut))) {
    console.error('Query missing required parameter.');
    res.json({ error: 'Query requires both checkIn and checkOut parameters.' });
    // TO-DO: Make sure valid dates can be parsed from query params
  } else {
    const checkInParam = new Date(parseInt(checkIn, 10));
    const checkOutParam = new Date(parseInt(checkOut, 10));
    // Get all future bookings
    // NICE-TO-HAVE: Refactor to not query all future bookings
    Booking.find(
      { checkOut: { $gte: new Date() } },
      (errFindingBooking, foundBookings) => {
        if (errFindingBooking) {
          console.error(errFindingBooking);
          res.json({ error: 'Could not retrieve bookings.' });
        } else {
          const desiredInterval = { start: checkInParam, end: checkOutParam };
          // TO-DO: Refactor next two lines into one reduce method
          const conflictingBookings = foundBookings.filter((eachBooking) => areIntervalsOverlapping(
            desiredInterval,
            { start: eachBooking.checkIn, end: eachBooking.checkOut },
          ));
          const listingsToFilter = conflictingBookings
            .map((eachBooking) => eachBooking._associatedListing);
          Listing.find(
            {
              _id: { $nin: listingsToFilter },
              isArchived: { $ne: true },
              _hostUser: { $ne: userId },
            },
            '-__v',
            (errFindingListing, foundListings) => {
              if (errFindingListing) {
                console.error(errFindingListing);
                res.json({ error: 'Could not GET filtered listings' });
              } else res.json(foundListings);
            },
          );
        }
      },
    );
  }
};

const getListings = (req, res) => {
  const userId = req.user ? req.user._id : null;
  if (req.query.checkIn || req.query.checkOut) (getListingsByAvailability(req, res));
  else {
    Listing.find(
      {
        isArchived: { $ne: true },
        _hostUser: { $ne: userId },
      },
      '-__v',
      (err, foundListings) => {
        if (err) {
          console.error(err);
          res.json({ error: 'Could not GET listings' });
        } else res.json(foundListings);
      },
    );
  }
};

const getListingById = (req, res) => {
  const { listingId } = req.params;
  Listing.findOne({ _id: listingId, isArchived: { $ne: true } },
    '-__v',
    (err, foundListing) => {
      if (err) {
        console.error(err);
        res.json({ error: 'Error finding listing with that ID' });
      } else res.json(foundListing);
    });
};

const getListingsByHost = (req, res) => {
  const _hostUser = req.user._id;
  Listing.find({ _hostUser }, '-__v', (err, foundListings) => {
    if (err) {
      console.error(err);
      res.json({ error: 'Error finding listings with that host.' });
    } else res.json(foundListings);
  });
};

const toggleListingArchival = (req, res) => {
  const { listingId } = req.params;
  const requestingUser = req.user._id;
  Listing.findOne(
    { _id: listingId, _hostUser: requestingUser },
    (errFindingListing, foundListing) => {
      if (errFindingListing) {
        console.error(errFindingListing);
        res.json({ error: errFindingListing });
      } else {
        const updatedListing = foundListing;
        updatedListing.isArchived = !updatedListing.isArchived;
        foundListing.save((errSavingListing) => {
          if (errSavingListing) {
            console.error(errSavingListing);
            res.json({ error: errSavingListing });
          } else res.json({ success: `Listing has successfully been ${updatedListing.isArchived ? '' : 'un'}archived.` });
        });
      }
    },
  );
};

const postBooking = (req, res) => {
  const { _associatedListing, checkIn, checkOut } = req.body;
  const _guestUser = req.user._id;
  const dateNow = new Date();
  const dateCheckIn = new Date(checkIn);
  const dateCheckOut = new Date(checkOut);
  if (!(_associatedListing && checkIn && checkOut && _guestUser)) {
    console.error('Missing parameter.');
    res.json({ error: 'Missing parameter.' });
  } else if (dateCheckIn < dateNow || dateCheckOut < dateNow) {
    console.log('Booking failed because checkIn or checkOut is in the past.');
    res.json({ error: 'Bookings must be made at least 24 hours prior to check-in.' });
  } else if (checkOut < checkIn) {
    console.log('Booking failed because checkOut before checkIn.');
    res.json({ error: 'Check-out cannot be before check-in.' });
  } else {
    const newBooking = new Booking({
      _associatedListing,
      checkIn,
      checkOut,
      _guestUser,
    });

    // Confirm there is a listing with that ID.
    Listing.findOne(
      { _id: _associatedListing, isArchived: { $ne: true } },
      (errFindingListing, foundListing) => {
        if (errFindingListing) {
          console.error(errFindingListing);
          res.json({ error: 'Error searching for listing with that ID.' }); // Do 0 results send an error?
        } else if (foundListing._hostUser.toString() === _guestUser.toString()) {
          console.log('Booking failed because guest is same as listing host.');
          res.json({ error: 'Host cannot book own listing.' });
          // Check if host is the same as the guest.
        } else {
          // Confirm there are no conflicting bookings already on this listing
          Booking.find(
            { _associatedListing: foundListing },
            '-__v -_id',
            (errFindingBooking, foundBookings) => {
              if (errFindingBooking) {
                console.error(errFindingBooking);
                res.json({ error: 'Error searching for conflicting bookings.' });
              } else if (!foundBookings.length) {
                // If there no other bookings on listing, save booking
                newBooking.save((errSavingBooking, savedBooking) => {
                  if (errSavingBooking) {
                    console.error(errSavingBooking);
                    res.json({ error: 'Could not save booking' });
                  } else {
                    res.json(savedBooking);
                  }
                });
              } else {
                // If there are bookings, make sure they don't conflict with this one
                const thisBookingInterval = { start: dateCheckIn, end: dateCheckOut };
                // First, map all other bookings into date intervals
                const otherBookingIntervals = foundBookings
                  .map((booking) => ({
                    start: new Date(booking.checkIn),
                    end: new Date(booking.checkOut),
                  }));
                  // Next, check each to our proposed interval
                if (otherBookingIntervals.every(
                  (eachInterval) => !areIntervalsOverlapping(eachInterval, thisBookingInterval),
                )) {
                  // If there are no conflicts, save and send back the new booking
                  newBooking.save((err, savedBooking) => {
                    if (err) {
                      console.error(err);
                      res.json({ error: 'Could not save booking' });
                    } else {
                      res.json(savedBooking);
                    }
                  });
                } else {
                  // If a conflict is found, respond back with error message.
                  console.error(`found conflicting bookings: ${foundBookings}`);
                  res.json({ error: 'Found conflicting bookings.' });
                }
              }
            },
          );
        }
      },
    );
  }
};

// TO-DO: Finish and write tests for this endpoint
const getBookingsByListing = (req, res) => {
  const _associatedListing = req.params.listingId;
  if (!_associatedListing) {
    res.json({ error: 'Missing listingId' });
  } else {
    Booking.find(
      { _associatedListing },
      '-__v -_id -_guestUser',
      (err, foundBookings) => {
        if (err) {
          console.error(err);
          res.json({ error: 'Could not get bookings' });
        } else res.json(foundBookings);
      },
    );
  }
};

const getBookingsForGuest = (req, res) => {
  const _guestUser = req.user._id;
  Booking.find(
    { _guestUser },
    (errFindingBooking, foundBookings) => {
      if (errFindingBooking) {
        console.error(errFindingBooking);
        res.json({ error: 'Could not get bookings' });
      } else if (foundBookings.length === 0) {
        res.json(foundBookings);
      } else {
        // Get IDs of Listings
        const listingIds = foundBookings.map((eachBooking) => eachBooking._associatedListing);
        // Search for bookings by those IDs
        Listing.find(
          { _id: { $in: listingIds } },
          (errFindingListings, foundListings) => {
            if (errFindingListings) {
              console.error(errFindingListings);
              res.json({ error: 'Could not get info for associated listings.' });
            } else {
              // Update the bookings array to include listing info for each booking
              // First, create object with each listing's info
              const listingInfoById = foundListings
                .reduce((acc, curr) => (acc[curr._id]
                  ? acc
                  : {
                    ...acc,
                    [curr._id]: {
                      title: curr.title,
                      photoURLs: curr.photoURLs,
                    },
                  }
                ), {});
                // Then, add listing title and photoURLs to each booking object
              const bookingsWithListingInfo = foundBookings.map((booking) => ({
                ...booking.toObject(),
                listingInfo: listingInfoById[booking._associatedListing],
              }));
              res.json(bookingsWithListingInfo);
            }
          },
        );
      }
    },
  );
};

const getBookingsForHost = (req, res) => {
  const _hostUser = req.user._id;
  Listing.find(
    { _hostUser, isArchived: { $ne: true } },
    (errFindingListings, foundListings) => {
      if (errFindingListings) {
        console.error(errFindingListings);
        res.json({ error: 'Could not get listings' });
      } else if (foundListings.length === 0) {
        res.json(foundListings);
      } else {
        // Get IDs of Listings
        const listingIds = foundListings.map((thisListing) => thisListing._id);
        // Search for bookings by those IDs
        Booking.find(
          { _associatedListing: { $in: listingIds } },
          (errFindingBookings, foundBookings) => {
            if (errFindingBookings) {
              console.error(errFindingBookings);
              res.json({ error: 'Could not get bookings' });
            } else {
              // Get the users associated with the IDs on those bookings
              const guestUserIDs = foundBookings.map((booking) => booking._guestUser);
              User.find({ _id: guestUserIDs }, (errFindingUsers, foundGuestUsers) => {
                if (errFindingUsers) {
                  console.error(errFindingUsers);
                  res.json({ error: 'Could not get guest users.' });
                } else {
                  // Update bookings array to include guests' usernames
                  const guestUsernamesById = foundGuestUsers.reduce((acc, user) => {
                    if (acc[user._id]) return acc;
                    acc[user._id] = user.username;
                    return acc;
                  }, {});
                  const bookingsWithUsernames = foundBookings.map((booking) => {
                    const updatedBooking = booking.toObject();
                    updatedBooking.guestUsername = guestUsernamesById[booking._guestUser];
                    return updatedBooking;
                  });
                  res.json(bookingsWithUsernames);
                }
              });
            }
          },
        );
      }
    },
  );
};

module.exports = {
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
};
