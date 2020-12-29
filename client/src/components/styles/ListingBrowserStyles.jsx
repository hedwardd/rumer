import styled from 'styled-components';
import device from './device';

const StyledListingBrowser = styled.div`
  margin: 0px 5%;
  @media ${device.laptop} {
    margin: 0px 10%;
  }
`;

const ImageSection = styled.div`
  width: 100%;

  @media ${device.tablet} {
    width: 300px;
    height: 200px;
  }
`;

const StyledList = styled.ul`
  display: contents;
`;

const StyledListItem = styled.li`
  list-style-type: none;
`;

const ListingContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const StyledLink = styled.a`
  padding: 1vw;
  text-decoration: none;
  color: black;
`;

export {
  StyledListingBrowser, ImageSection, StyledList, StyledListItem, ListingContainer, StyledLink,
};
