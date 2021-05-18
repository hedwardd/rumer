import styled from 'styled-components';
import device from './device';

const StyledGuestDashboard = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
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
  // box-shadow: #ffffff 0px 0px 0px 2px, #222222 0px 0px 0px 4px;
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
  color: #484848;
  padding: 5px 5px;
  @media ${device.tablet} {
    padding: 12px 12px;
    border: 1px solid #E4E4E4;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.05) 0 4px 4px 0;
  }
`;

const StyledList = styled.ul`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const StyledListItem = styled.li`
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

const StyledImage = styled.img`
  height: 70%;
  margin: 0px;
`;

const StyledDetailsSection = styled.div`
  height: 30%;
  padding: 10px;
`;

const StyledDateRange = styled.p`
  font-size: 12px;
  color: #717171;
`;

export {
  StyledGuestDashboard,
  StyledActiveTab,
  StyledInactiveTab,
  StyledImage,
  StyledContainer,
  StyledList,
  StyledListItem,
  EmptyStateText,
  StyledDetailsSection,
  StyledDateRange,
};
