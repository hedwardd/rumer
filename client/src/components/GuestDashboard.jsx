import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledDashboard = styled.div`
  padding: 0px 80px;
`;

const StyledImg = styled.img`
  width: 4vw;
  border-radius: 1vw;
`;

const StyledContainer = styled.div`
  border: 1px solid #E4E4E4;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 4px 4px 0;
  margin: 24px;
  padding: 12px 12px;
  color: #484848;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StyledListItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
`;

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

const ReservationsList = ({ bookings }) => (bookings.length ? (
  <StyledList>
    {bookings.map((eachBooking) => (
      <StyledListItem key={eachBooking._id}>
        <StyledImg
          src={eachBooking.listingInfo.photoURLs[0]}
          alt=""
        />
        <p>
          {new Date(eachBooking.checkIn).toLocaleDateString()}
          -
          {new Date(eachBooking.checkOut).toLocaleDateString()}
        </p>
        <p>
          {eachBooking.listingInfo.title}
        </p>
      </StyledListItem>
    ))}
  </StyledList>
) : 'No reservations to show.');

export default function GuestDashboard({ user }) {
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    async function fetchBookingData() {
      const bookingData = await getBookings();
      setBookings(bookingData);
    }
    if (user) fetchBookingData();
  }, [user]);

  return (
    <StyledDashboard>
      <h1>Reservations</h1>

      <StyledContainer>
        <h2>Upcoming Reservations</h2>
        {bookings
          ? <ReservationsList bookings={bookings} />
          : 'Loading'}
      </StyledContainer>
    </StyledDashboard>
  );
}
