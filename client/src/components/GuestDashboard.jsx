import React, { useState, useEffect } from 'react';
import formatDateInterval from '../utilities/index';
import {
  StyledGuestDashboard,
  StyledActiveTab,
  StyledInactiveTab,
  StyledImage,
  StyledContainer,
  StyledList,
  StyledListItem,
  StyledDetailsSection,
  StyledDateRange,
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
  const now = new Date();
  const upcomingBookings = bookingData
    .filter(
      (thisBooking) => (
        (new Date(thisBooking.checkIn) >= now) || (new Date(thisBooking.checkOut) >= now)
      ),
    );
  const pastBookings = bookingData
    .filter(
      (thisBooking) => (
        (new Date(thisBooking.checkIn) < now) && (new Date(thisBooking.checkOut) < now)),
    );
  const bookingsObject = {
    upcoming: upcomingBookings,
    past: pastBookings,
  };
  return bookingsObject;
};

const ReservationsList = ({ bookings }) => (bookings.length ? (
  <StyledList>
    {bookings.map((eachBooking) => (
      <StyledListItem key={eachBooking._id}>
        <StyledImage
          src={eachBooking.listingInfo.photoURLs[0]}
          alt=""
        />
        <StyledDetailsSection>
          <StyledDateRange>
            {formatDateInterval(eachBooking.checkIn, eachBooking.checkOut)}
          </StyledDateRange>
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
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [isPastSelected, setIsPastSelected] = useState(false);
  useEffect(() => {
    async function fetchBookingData() {
      setIsLoading(true);
      const bookingData = await getBookings();
      setUpcomingBookings(bookingData.upcoming);
      setPastBookings(bookingData.past);
      setIsLoading(false);
    }
    if (user) fetchBookingData();
  }, [user]);

  return (
    <StyledGuestDashboard>
      <h1>
        Reservations
      </h1>

      {isPastSelected ? (
        <div>
          <StyledInactiveTab
            type="button"
            role="tab"
            isSelected={!isPastSelected}
            onClick={() => setIsPastSelected(false)}
          >
            Upcoming
          </StyledInactiveTab>
          <StyledActiveTab
            type="button"
            role="tab"
            isSelected={isPastSelected}
            onClick={() => setIsPastSelected(true)}
          >
            Past
          </StyledActiveTab>
        </div>
      ) : (
        <div>
          <StyledActiveTab
            type="button"
            role="tab"
            isSelected={!isPastSelected}
            onClick={() => setIsPastSelected(false)}
          >
            Upcoming
          </StyledActiveTab>
          <StyledInactiveTab
            type="button"
            role="tab"
            isSelected={isPastSelected}
            onClick={() => setIsPastSelected(true)}
          >
            Past
          </StyledInactiveTab>
        </div>
      )}

      <StyledContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ReservationsList bookings={isPastSelected ? pastBookings : upcomingBookings} />
        )}
      </StyledContainer>
    </StyledGuestDashboard>
  );
}
