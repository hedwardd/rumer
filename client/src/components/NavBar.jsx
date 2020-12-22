import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavDropDown from './NavDropDown';
import NavDatePicker from './NavDatePicker';
import device from './styles/device';

const StyledNavBar = styled.nav`
  height: 64px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 2vw;

  @media ${device.tablet} {
    height: 80px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  min-width: 5vw;
  height: 42px;
  font-size: 14px;
  padding: 5px 10px;
  position: relative;
  vertical-align: middle;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 21px;
  z-index: 1;
  transition: box-shadow .2s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  }
`;

const NavBar = (props) => {
  const { user, _handleLogout } = props;
  const isAuthenticated = !!user;

  return (
    <StyledNavBar>

      <StyledLink to="/">
        <p>Home</p>
      </StyledLink>

      {/* <StyledLink to="/browse">
                <p>Browse</p>
            </StyledLink> */}
      <NavDatePicker />

      {isAuthenticated
        ? (
          <NavDropDown
            user={user}
            _handleLogout={_handleLogout}
          />
        )
        : (
          <StyledLink to="/login">
            <p>Log in</p>
          </StyledLink>
        )}

    </StyledNavBar>
  );
};

export default NavBar;
