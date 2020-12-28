import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavDropDown from './NavDropDown';
import NavDatePicker from './NavDatePicker';
import device from './styles/device';

const StyledNavBar = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 64px;
  display: flex;
  // padding: 0 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;

  @media ${device.laptop} {
    justify-content: space-between;
    height: 80px;
  }
`;

const StyledNavLink = styled(Link)`
  margin: 0 24px;
  text-decoration: none;
  color: black;
  display: none;
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
  transition: box-shadow .2s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  }
  @media ${device.laptop} {
    display: inline-flex;
  }
`;

const NavBar = (props) => {
  const { user, _handleLogout } = props;
  const isAuthenticated = !!user;

  return (
    <StyledNavBar>

      <StyledNavLink to="/">
        <p>Home</p>
      </StyledNavLink>

      <NavDatePicker />

      {isAuthenticated
        ? (
          <NavDropDown
            user={user}
            _handleLogout={_handleLogout}
          />
        )
        : (
          <StyledNavLink to="/login">
            <p>Log in</p>
          </StyledNavLink>
        )}

    </StyledNavBar>
  );
};

export default NavBar;
