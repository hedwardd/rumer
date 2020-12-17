import React, { useState, useEffect } from 'react';

const getBookings = async () => {
  const response = await fetch('/api/myBookings', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  const bookingData = await response.json();
  return bookingData;
};

const BookingListItem = ({ booking }) => (
  <li>
    <p>
      {new Date(booking.checkIn).toLocaleDateString()}
      -
      {new Date(booking.checkOut).toLocaleDateString()}
    </p>
    <p>{booking.listingInfo.title}</p>
    <img
      src={booking.listingInfo.photoURLs[0]}
      alt=""
    />
  </li>
);

export default function GuestDashboard({ user }) {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchBookingData() {
      const bookingData = await getBookings();
      setBookings(bookingData);
    }
    if (user) fetchBookingData();
  }, [user]);

  return (
    <div>
      <h1>Reservations</h1>
      {
        bookings.length ? (
          <div>
            <ul>
              {bookings.map((booking) => (
                <BookingListItem
                  key={booking._id}
                  booking={booking}
                />
              ))}
            </ul>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <p>There are no bookings to show.</p>
          </div>
        )
      }
    </div>
  );
}
