import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import 'react-image-gallery/styles/css/image-gallery.css';

const StyledListingFullView = styled.div`
  width: 100%;
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  `;

const TitleSection = styled.section`

  `;

const ImageSection = styled.section`

  `;

const DetailsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  `;

const DescriptionWrapper = styled.div`
  width: 58.3333%;
  `;

export default function ListingFullView({ user }) {
  const [listing, setListing] = useState({});

  const { listingId } = useParams();

  useEffect(() => {
    // Get the listings and store them in state
    async function fetchData() {
      const res = await fetch(`/api/listings/${listingId}`);
      const listingData = await res.json();
      setListing({ ...listingData });
    }
    fetchData();
  }, [listingId]);

  const hasDataLoaded = Object.keys(listing).length !== 0;
  const images = (listing.photoURLs) ? listing.photoURLs.map((url) => ({ original: url })) : null;

  return (hasDataLoaded) ? (
    // Render the listings if we have them
    <StyledListingFullView>
      <TitleSection>
        <h1>{listing.title}</h1>
      </TitleSection>

      <ImageSection>
        <ImageGallery
          items={images}
          showThumbnails={false}
          showPlayButton={false}
          showBullets={images.length > 1}
        />
      </ImageSection>

      <DetailsSection>

        <DescriptionWrapper>
          <p>{listing.description}</p>
        </DescriptionWrapper>

        <BookingForm
          user={user}
          listingId={listing._id}
        />

      </DetailsSection>
    </StyledListingFullView>
  ) : (
    // Otherwise, render a helpful message
    <div>
      <p>Loading...</p>
    </div>
  );
}
