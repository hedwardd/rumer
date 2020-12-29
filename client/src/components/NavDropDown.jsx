import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StyledDropDown, DropDownButton, DropDownContainer, DropDownLink, MenuDivider,
} from './styles/NavDropDownStyles';

export default function NavDropDown({ user, _handleLogout }) {
  const { username } = user;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledDropDown
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >

      <DropDownButton isOpen={isOpen}>
        <p>{username}</p>
      </DropDownButton>

      <DropDownContainer isOpen={isOpen}>

        <DropDownLink as={Link} primary="true" onClick={() => setIsOpen(false)} to="/bookings">
          My Reservations
        </DropDownLink>

        <MenuDivider />

        <DropDownLink as={Link} onClick={() => setIsOpen(false)} to="/hosting">
          Manage Listings
        </DropDownLink>

        <DropDownLink as={Link} onClick={() => setIsOpen(false)} to="/addListing">
          Add Listing
        </DropDownLink>

        <MenuDivider />

        <DropDownLink as="button" type="button" onClick={_handleLogout}>
          Log out
        </DropDownLink>

      </DropDownContainer>

    </StyledDropDown>
  );
}
