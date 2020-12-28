import styled from 'styled-components';
import device from './device';

const StyledGuestDashboard = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    padding: 0px 80px;
  }
`;

const StyledHeader1 = styled.h1`
  align-self: flex-start;
`;

const StyledContainer = styled.div`
  color: #484848;
  margin: 5px;
  padding: 5px 5px;
  @media ${device.tablet} {
    margin: 0px 24px;
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
  justify-content: space-around;
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

const StyledImg = styled.img`
  height: 70%;
  margin: 0px;
`;

const StyledDetailsSection = styled.div`
  height: 30%;
  padding: 10px;
`;

export {
  StyledGuestDashboard,
  StyledHeader1,
  StyledImg,
  StyledContainer,
  StyledList,
  StyledListItem,
  StyledDetailsSection,
};
