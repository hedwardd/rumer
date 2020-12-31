import React, { useState, useEffect } from 'react';
import formatDateInterval from '../utilities/index';
import {
  StyledHostDashboard,
  StyledActiveTab,
  StyledInactiveTab,
  StyledListingImage,
  StyledContainer,
  StyledBookingList,
  StyledBookingItem,
  StyledBookingImage,
  StyledBookingDetailsSection,
  StyledDateRange,
  StyledListingItem,
  StyledArchiveButton,
} from './styles/HostDashboardStyles';

const fetchHostData = async (param) => {
  const response = await fetch(`/api/host/${param}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  const data = await response.json();
  return data;
};

const toggleIsListingArchived = async (listingId) => {
  const response = await fetch(`/api/listings/${listingId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  const responseObject = await response.json();
  return responseObject;
};

const BookingsList = ({ bookings }) => (bookings.length ? (
  <StyledBookingList>
    {bookings
      .map((eachBooking) => (
        <StyledBookingItem key={eachBooking._id}>
          <StyledBookingImage
            src={eachBooking.listingInfo.photoURLs[0]}
            alt=""
          />
          <StyledBookingDetailsSection>
            <StyledDateRange>
              {formatDateInterval(eachBooking.checkIn, eachBooking.checkOut)}
            </StyledDateRange>
            <p>
              {eachBooking.listingInfo.title}
            </p>
            <p>
              Reserved by:
              {' '}
              {eachBooking.guestUsername}
            </p>
          </StyledBookingDetailsSection>
        </StyledBookingItem>
      ))}
  </StyledBookingList>
) : 'No bookings to show.');

const ListingsList = ({ listings, handleArchiveButton }) => (listings.length ? (
  <ul>
    {listings.map((eachListing) => (
      <StyledListingItem key={eachListing._id}>

        <StyledListingImage src={eachListing.photoURLs[0]} />

        <p>{eachListing.title}</p>

        <StyledArchiveButton
          type="button"
          onClick={(e) => handleArchiveButton(e, eachListing._id)}
        >
          {eachListing.isArchived
            ? 'Restore'
            : 'Archive'}
        </StyledArchiveButton>

      </StyledListingItem>
    ))}
  </ul>
) : 'No bookings to show.');

export default function HostDashboard({ user }) {
  const [listings, setListings] = useState([]);
  const [areListingsLoading, setAreListingsLoading] = useState(false);
  useEffect(() => {
    async function fetchListingData() {
      setAreListingsLoading(true);
      const listingData = await fetchHostData('listings/');
      setListings(listingData);
      setAreListingsLoading(false);
    }
    if (user) fetchListingData();
  }, [user]);

  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [areBookingsLoading, setAreBookingsLoading] = useState(false);
  const [isPastSelected, setIsPastSelected] = useState(false);
  useEffect(() => {
    async function fetchBookingData() {
      setAreBookingsLoading(true);
      const listingInfoById = listings
        .reduce((acc, curr) => ({
          ...acc,
          [curr._id]: {
            title: curr.title,
            photoURLs: curr.photoURLs,
          },
        }), {});
      const bookingData = await fetchHostData('bookings/');
      const bookingsWithListingInfo = bookingData
        .map((thisBooking) => ({
          ...thisBooking,
          listingInfo: { ...listingInfoById[thisBooking._associatedListing] },
        }));
      const now = new Date();
      const upcoming = bookingsWithListingInfo
        .filter(
          (thisBooking) => (
            (new Date(thisBooking.checkIn) >= now) || (new Date(thisBooking.checkOut) >= now)
          ),
        );
      const past = bookingsWithListingInfo
        .filter(
          (thisBooking) => (
            (new Date(thisBooking.checkIn) < now) && (new Date(thisBooking.checkOut) < now)),
        );
      setUpcomingBookings(upcoming);
      setPastBookings(past);
      setAreBookingsLoading(false);
    }
    if (listings.length) fetchBookingData();
  }, [listings]);

  const handleArchiveButton = async (event, listingId) => {
    event.preventDefault();
    const result = await toggleIsListingArchived(listingId);
    if (result.success) window.open('/hosting', '_self');
  };

  return (
    <StyledHostDashboard>
      <h1>
        Hosting Dashboard
      </h1>

      <h2>
        Reservations
      </h2>
      <StyledContainer>
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

        {areBookingsLoading ? (
          <div>Loading...</div>
        ) : (
          <BookingsList
            bookings={isPastSelected ? pastBookings : upcomingBookings}
            handleArchiveButton={handleArchiveButton}
          />
        )}
      </StyledContainer>

      <h2>
        Your Listings
      </h2>
      <StyledContainer>
        {areListingsLoading ? (
          <div>Loading...</div>
        ) : (
          <ListingsList listings={listings} />
        )}
      </StyledContainer>

    </StyledHostDashboard>
  );
}
