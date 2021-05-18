import styled from 'styled-components';
import device from './device';
import { ReactComponent as SearchIcon } from '../../icons/search-black.svg';
import { ReactComponent as BedIcon } from '../../icons/double-bed.svg';
import { ReactComponent as LoginIcon } from '../../icons/login.svg';
import { ReactComponent as LogoutIcon } from '../../icons/logout.svg';
import { ReactComponent as AddIcon } from '../../icons/plus-round-line.svg';
import { ReactComponent as HouseIcon } from '../../icons/house.svg';

const StyledMobileNavBar = styled.nav`
  position: fixed;
  width: 100%;
  height: 75px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 5;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  box-sizing: border-box;
  @media ${device.laptop} {
    display: none;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border: none;
  width: 20%;
  font-size: 10px;
  padding: 5px 10px;
  position: relative;
  vertical-align: middle;
  background-color: white;
  z-index: 1;
  @media ${device.mobileM} {
    font-size: 11px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
  }
`;

const StyledIconSection = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
`;

const StyledLabelSection = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 20px;
  height: 20px;
`;

const StyledBedIcon = styled(BedIcon)`
  width: 24px;
  height: 24px;
`;

const StyledLoginIcon = styled(LoginIcon)`
  width: 24px;
  height: 24px;
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  width: 24px;
  height: 24px;
`;

const StyledAddIcon = styled(AddIcon)`
  width: 24px;
  height: 24px;
`;

const StyledHouseIcon = styled(HouseIcon)`
  width: 24px;
  height: 24px;
`;

export {
  StyledMobileNavBar,
  StyledLink,
  StyledIconSection,
  StyledLabelSection,
  StyledSearchIcon,
  StyledBedIcon,
  StyledLoginIcon,
  StyledLogoutIcon,
  StyledAddIcon,
  StyledHouseIcon,
};
