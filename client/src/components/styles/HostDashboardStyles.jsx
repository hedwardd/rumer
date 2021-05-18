import styled from 'styled-components';
import device from './device';

const StyledHostDashboard = styled.div`
  padding: 0px 10px;
  @media ${device.laptop} {
    padding: 0px 80px;
  }
`;

const StyledTab = styled.button`
  color: #222222;
  background: transparent;
  cursor: pointer;
  border: none;
  padding: 16px;
  margin: 4px;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  @media ${device.tablet} {
    font-size: 16px;
    line-height: 20px;
  }
`;

const StyledActiveTab = styled(StyledTab)`
  ::after {
    border-color: rgb(34, 34, 34);
    border-style: solid;
    border-width: 0px 0px 2px;
    content: "";
    display: block;
    margin-bottom: -16px;
    padding-top: 16px;
  }
`;

const StyledInactiveTab = styled(StyledTab)`
  color: #717171;
  :hover {
    background: #f7f7f7;
    color: #222222;
  }
`;

const StyledContainer = styled.div`
  border: 1px solid #E4E4E4;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 4px 4px 0;
  margin: 24px;
  padding: 12px 12px;
  color: #484848;
`;

const StyledBookingList = styled.ul`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media ${device.laptop} {
    justify-content: flex-start;
  }
`;

const StyledBookingItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 10px;
  height: 300px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 4px 4px 0;
  @media ${device.desktop} {
    width: 300px;
  }
`;

const EmptyStateText = styled.p`
  margin: 20px;
`;

const StyledBookingImage = styled.img`
  height: 50%;
  margin: 0px;
`;

const StyledBookingDetailsSection = styled.div`
  height: 50%;
  padding: 10px;
`;

const StyledDateRange = styled.p`
  font-size: 12px;
  color: #717171;
`;

const StyledListingItem = styled.li`
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const StyledListingImage = styled.img`
  max-height: 100px;
  border-radius: 1vw;
`;

const StyledArchiveButton = styled.button`
  min-width: 85px;
  min-height: 50px;
`;

export {
  StyledHostDashboard,
  StyledActiveTab,
  StyledInactiveTab,
  StyledListingImage,
  StyledContainer,
  StyledBookingList,
  StyledBookingItem,
  EmptyStateText,
  StyledBookingImage,
  StyledBookingDetailsSection,
  StyledDateRange,
  StyledListingItem,
  StyledArchiveButton,
};
