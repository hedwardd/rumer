import styled from 'styled-components';

import device from './device';
import layoutSize from './layoutSize';

const StyledListingBrowser = styled.div`
  margin: ${layoutSize[9]} ${layoutSize[5]};
  @media ${device.laptop} {
    margin: ${layoutSize[10]} ${layoutSize[10]};
  }
`;

const ImageSection = styled.div`
  width: 100%;
  cursor: pointer;

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
  margin: ${layoutSize[2]} ${layoutSize[1]};
  text-decoration: none;
  color: black;

  @media ${device.tablet} {
    margin: 0 ${layoutSize[3]};
  }
`;

export {
  StyledListingBrowser, ImageSection, StyledList, StyledListItem, ListingContainer, StyledLink,
};
