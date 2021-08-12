import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import device from './device';

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

const StyledImageGallery = styled.div`
`;

const DetailsSection = styled.section`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} {
    padding-top: 48px;
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

const DescriptionText = styled.p`
  line-height: 28px;
`;

const BookingFormWrapper = styled.div`
  min-width: 336px;
  margin-bottom: 225px;
  @media ${device.laptop} {
    width: 33%;
    margin-bottom: 250px;
  }
`;

export {
  StyledListingFullView,
  TitleSection,
  ImageSection,
  StyledImageGallery,
  DetailsSection,
  DescriptionWrapper,
  DescriptionText,
  BookingFormWrapper,
};
