import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from './styles/device';

const StyledMobileNavBar = styled.nav`
  z-index: 5;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media ${device.laptop} {
    display: none;
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

export default function MobileNavBar({ user, _handleLogout }) {
  return (
    <StyledMobileNavBar>

      <StyledLink to="/browse">
        <p>Browse</p>
      </StyledLink>

      {user ? (
        <StyledLink to="/bookings">
          Reservations
        </StyledLink>
      ) : null}

      {user ? (
        <StyledLink to="/hosting">
          Manage Listings
        </StyledLink>
      ) : null}

      {user ? (
        <StyledLink to="/addListing">
          Add Listing
        </StyledLink>
      ) : null}

      {user ? (
        <StyledLink as="div" onClick={_handleLogout}>
          Log out
        </StyledLink>
      ) : (
        <StyledLink to="/login">
          Log in
        </StyledLink>
      )}

    </StyledMobileNavBar>
  );
}
