import React, { useState, useEffect } from 'react';
import {
  StyledGuestDashboard,
  StyledHeader1,
  StyledImg,
  StyledContainer,
  StyledList,
  StyledListItem,
  StyledDetailsSection,
} from './styles/GuestDashboardStyles';

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
        <StyledDetailsSection>
          <p>
            {new Date(eachBooking.checkIn).toLocaleDateString()}
            -
            {new Date(eachBooking.checkOut).toLocaleDateString()}
          </p>
          <p>
            {eachBooking.listingInfo.title}
          </p>
        </StyledDetailsSection>
      </StyledListItem>
    ))}
  </StyledList>
) : 'No reservations to show.');

export default function GuestDashboard({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchBookingData() {
      setIsLoading(true);
      const bookingData = await getBookings();
      setBookings(bookingData);
      setIsLoading(false);
    }
    if (user) fetchBookingData();
  }, [user]);

  return (
    <StyledGuestDashboard>
      <StyledHeader1>Reservations</StyledHeader1>

      <StyledContainer>
        <h2>Upcoming Reservations</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ReservationsList bookings={bookings} />
        )}
      </StyledContainer>
    </StyledGuestDashboard>
  );
}
