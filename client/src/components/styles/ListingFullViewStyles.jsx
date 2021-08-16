import styled from 'styled-components';
import device from './device';
import layoutSize from './layoutSize';

const StyledListingFullView = styled.div`
  padding: 0 ${layoutSize[5]};
  display: flex;
  flex-direction: column;
  
  @media ${device.laptop} {
    padding: ${layoutSize[1]} ${layoutSize[9]};
  }
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
