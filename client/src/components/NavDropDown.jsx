import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  StyledDropDown, DropDownButton, DropDownContainer, DropDownLink, MenuDivider,
} from './styles/NavDropDownStyles';

export default function NavDropDown({ user, _handleLogout }) {
  const { username } = user;
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  return (
    <StyledDropDown>

      <DropDownButton
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <p>{username}</p>
      </DropDownButton>

      <OutsideClickHandler
        disabled={!isOpen}
        onOutsideClick={() => setIsOpen(false)}
      >

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

          <DropDownLink
            as="button"
            type="button"
            onClick={async () => {
              await _handleLogout();
              history.push('/');
            }}
          >
            Log out
          </DropDownLink>

        </DropDownContainer>

      </OutsideClickHandler>

    </StyledDropDown>
  );
}
