import React, { useState, useEffect } from 'react';
import {
  StyledHostDashboard,
  StyledImg,
  StyledContainer,
  StyledList,
  StyledBookingItem,
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
  <StyledList>
    {bookings
      .filter((eachBooking) => new Date(eachBooking.checkOut) > new Date())
      .map((eachBooking) => (
        <StyledBookingItem key={eachBooking._id}>
          <p>
            {new Date(eachBooking.checkIn).toLocaleDateString()}
            -
            {new Date(eachBooking.checkOut).toLocaleDateString()}
          </p>
          <p>
            {eachBooking.listingTitle}
          </p>
          <p>
            Reserved by:
            {' '}
            {eachBooking.guestUsername}
          </p>
        </StyledBookingItem>
      ))}
  </StyledList>
) : 'No bookings to show.');

const ListingsList = ({ listings, handleArchiveButton }) => (listings.length ? (
  <StyledList>
    {listings.map((eachListing) => (
      <StyledListingItem key={eachListing._id}>

        <StyledImg src={eachListing.photoURLs[0]} />

        <p>{eachListing.title}</p>

        <StyledArchiveButton
          type="button"
          onClick={(e) => handleArchiveButton(e, eachListing._id)}
        >
          {eachListing.isArchived
            ? 'Unarchive'
            : 'Archive'}
        </StyledArchiveButton>

      </StyledListingItem>
    ))}
  </StyledList>
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

  const [bookings, setBookings] = useState([]);
  const [areBookingsLoading, setAreBookingsLoading] = useState(false);
  useEffect(() => {
    async function fetchBookingData() {
      setAreBookingsLoading(true);
      const listingTitles = listings
        .reduce((acc, curr) => ({ ...acc, [curr._id]: curr.title }), {});
      const bookingData = await fetchHostData('bookings/');
      const bookingsWithTitles = bookingData
        .map((booking) => ({
          ...booking,
          listingTitle: listingTitles[booking._associatedListing],
        }));
      setBookings(bookingsWithTitles);
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
      <h1>Hosting Dashboard</h1>

      <StyledContainer>
        <h2>Upcoming Bookings</h2>

        {areBookingsLoading ? (
          <div>Loading...</div>
        ) : (
          <BookingsList bookings={bookings} handleArchiveButton={handleArchiveButton} />
        )}
      </StyledContainer>

      <StyledContainer>
        <h2>Your Listings</h2>

        {areListingsLoading ? (
          <div>Loading...</div>
        ) : (
          <ListingsList listings={listings} />
        )}
      </StyledContainer>

    </StyledHostDashboard>
  );
}
