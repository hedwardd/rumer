import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import {
  StyledListingFullView,
  TitleSection,
  ImageSection,
  StyledImageGallery,
  DetailsSection,
  DescriptionWrapper,
  BookingFormWrapper,
} from './styles/ListingFullViewStyles';

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
        <StyledImageGallery
          as={ImageGallery}
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

        <BookingFormWrapper>
          <BookingForm
            user={user}
            listingId={listing._id}
          />
        </BookingFormWrapper>

      </DetailsSection>
    </StyledListingFullView>
  ) : (
    // Otherwise, render a helpful message
    <StyledListingFullView>
      <p>Loading...</p>
    </StyledListingFullView>
  );
}
