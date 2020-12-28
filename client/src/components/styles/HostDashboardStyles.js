import styled from 'styled-components';
import device from './device';

const StyledHostDashboard = styled.div`
  padding: 0px 10px;
  @media ${device.laptop} {
    padding: 0px 80px;
  }
`;

const StyledImg = styled.img`
  max-height: 100px;
  border-radius: 1vw;
`;

const StyledContainer = styled.div`
  border: 1px solid #E4E4E4;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 4px 4px 0;
  margin: 24px;
  padding: 12px 12px;
  color: #484848;
`;

const StyledList = styled.ul`

`;

const StyledBookingItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
`;

const StyledListingItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const StyledArchiveButton = styled.button`
  min-width: 85px;
  min-height: 50px;
`;

export {
  StyledHostDashboard,
  StyledImg,
  StyledContainer,
  StyledList,
  StyledBookingItem,
  StyledListingItem,
  StyledArchiveButton,
};
