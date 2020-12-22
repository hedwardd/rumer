import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import format from "date-fns/format"

const StyledDashboard = styled.div`
  padding: 0px 80px;
`;

const StyledImg = styled.img`
  width: 4vw;
  // height: 20vh;
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

`;

const StyledListItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
`;

const ListingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const getListings = async () => {
  const response = await fetch('/api/host/listings/', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  const listingData = await response.json();
  return listingData;
};

const getBookings = async () => {
  const response = await fetch('/api/host/bookings/', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  const listingData = await response.json();
  return listingData;
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

const ReservationsList = ({ bookings }) => (bookings.length ? (
  <StyledList>
    {bookings.map((eachBooking) => (
      <StyledListItem key={eachBooking._id}>
        <p>
          {new Date(eachBooking.checkIn).toLocaleDateString()}
          -
          {new Date(eachBooking.checkOut).toLocaleDateString()}
        </p>
        <p>{eachBooking.listingTitle}</p>
        <p>
          Reserved by:
          {' '}
          {eachBooking.guestUsername}
        </p>
      </StyledListItem>
    ))}
  </StyledList>
) : 'No reservations to show.');

export default function HostDashboard({ user }) {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    async function fetchListingData() {
      const listingData = await getListings();
      setListings(listingData);
    }
    if (user) fetchListingData();
  }, [user]);

  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    async function fetchBookingData() {
      const listingTitles = listings
        .reduce((acc, curr) => ({ ...acc, [curr._id]: curr.title }), {});
      const bookingData = await getBookings();
      const bookingsWithTitles = bookingData
        .map((booking) => ({
          ...booking,
          listingTitle: listingTitles[booking._associatedListing],
        }));
      setBookings(bookingsWithTitles);
    }
    if (listings.length) fetchBookingData();
  }, [listings]);

  const handleArchiveButton = async (event, listingId) => {
    event.preventDefault();
    const result = await toggleIsListingArchived(listingId);
    if (result.success) window.open('/hosting', '_self');
  };

  return (
    <StyledDashboard>
      <h1>Hosting Dashboard</h1>

      <StyledContainer>
        <h2>Upcoming Reservations on Your Listings</h2>

        {bookings
          ? <ReservationsList bookings={bookings} />
          : 'Loading...'}
      </StyledContainer>

      <StyledContainer>
        <h2>Your Listings</h2>

        {listings.length ? (
          <StyledList>
            {listings.map((eachListing) => (
              <StyledListItem key={eachListing._id}>
                <ListingContainer>

                  <StyledImg src={eachListing.photoURLs[0]} />

                  <p>{eachListing.title}</p>

                  <button
                    type="button"
                    onClick={(e) => handleArchiveButton(e, eachListing._id)}
                  >
                    {eachListing.isArchived
                      ? 'Unarchive'
                      : 'Archive'}
                  </button>

                </ListingContainer>
              </StyledListItem>
            ))}
          </StyledList>
        ) : null}
      </StyledContainer>

    </StyledDashboard>
  );
}
