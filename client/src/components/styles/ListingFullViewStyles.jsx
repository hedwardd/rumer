import styled from 'styled-components';
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

export {
  StyledListingFullView,
  TitleSection,
  ImageSection,
  StyledImageGallery,
  DetailsSection,
  DescriptionWrapper,
  BookingFormWrapper,
};
