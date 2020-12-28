import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import device from './styles/device';

const StyledListingFullView = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.section`

`;

const ImageSection = styled.section`
  
`;

const StyledImageGallery = styled(ImageGallery)`
`;

const DetailsSection = styled.section`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} {
    padding-top: 48px;
    padding-bottom: 300px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const DescriptionWrapper = styled.div`
  @media ${device.laptop} {
    width: 58.3333%;
  }
`;

const BookingFormWrapper = styled.div`
  min-width: 336px;
  margin-bottom: 300px;
  @media ${device.laptop} {
    width: 33%;
    margin: auto;
  }
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
        <StyledImageGallery
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
