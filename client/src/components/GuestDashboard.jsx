import React, { useState, useEffect } from 'react';

const getBookings = async () => {
	const response = await fetch("/api/myBookings", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  });
	const bookingData = await response.json();
	return bookingData;
}

export default function GuestDashboard ({ user }) {

  const [bookings, setBookings] = useState([]);
	useEffect(() => {
    if (user) {
      async function fetchBookingData() {
				const bookingData = await getBookings();
				setBookings(bookingData);
			}
			fetchBookingData();
    }
  }, [user]);
    
  return (
    <div>
      {/* <Switch>
        <Route path={`${match.path}/:listingId`}>
          <Listing />
        </Route>
        <Route path={match.path}> */}
        <h1>Reservations</h1>
          {/* Render the listings if we have them */}
          {
            bookings.length ? (
              <div>
                <ul>
                  {bookings.map((booking) =>
                    <li key={booking._id}>
                      {/* <Link to={`/browse/${listing._id}`}>
                        {listing.title}
                      </Link> */}
                      <p>
                        {new Date(booking.checkIn).toLocaleDateString()}
                         - 
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <p>{booking.listingInfo.title}</p>
                      <img
                        src={booking.listingInfo.photoURLs[0]}
                        alt={""}
                      />
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              // Render a helpful message otherwise
              <div>
                <p>There are no bookings to show.</p>
              </div>
            )}
        {/* </Route>
      </Switch> */}
    </div>
  );
}