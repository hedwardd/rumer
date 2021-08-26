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
  DescriptionText,
  BookingFormWrapper,
} from './styles/ListingFullViewStyles';

export default function ListingFullView({ user }) {
  const [listing, setListing] = useState({});

  const { listingId } = useParams();

  useEffect(() => {
    let controller = new AbortController();
    async function fetchData() {
      try {
        const res = await fetch(`/api/listings/${listingId}`, { signal: controller.signal });
        const listingData = await res.json();
        setListing({ ...listingData });
        controller = null;
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

    return () => {
      controller?.abort();
    };
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
          <DescriptionText>{listing.description}</DescriptionText>
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
