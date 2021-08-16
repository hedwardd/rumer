import styled from 'styled-components';

import device from './device';
import layoutSize from './layoutSize';
import fontSize from './fontSize';

const StyledListingBrowser = styled.div`
  padding: 0 ${layoutSize[5]};
  @media ${device.laptop} {
    padding: ${layoutSize[1]} ${layoutSize[9]};
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
  font-size: ${fontSize[4]};
  line-height: ${fontSize[6]};

  @media ${device.tablet} {
    margin: 0 ${layoutSize[3]};
  }
`;

export {
  StyledListingBrowser, ImageSection, StyledList, StyledListItem, ListingContainer, StyledLink,
};
