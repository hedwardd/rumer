import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
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
} from './styles/MobileNavBarStyles';

export default function MobileNavBar({ user, _handleLogout }) {
  const history = useHistory();

  return (
    <StyledMobileNavBar>

      <StyledLink as={Link} to="/browse">
        <StyledIconSection>
          <StyledSearchIcon />
        </StyledIconSection>
        <StyledLabelSection>
          <p>Browse</p>
        </StyledLabelSection>
      </StyledLink>

      {user ? (
        <StyledLink as={Link} to="/bookings">
          <StyledIconSection>
            <StyledBedIcon />
          </StyledIconSection>
          <StyledLabelSection>
            <p>Reservations</p>
          </StyledLabelSection>
        </StyledLink>
      ) : null}

      {user ? (
        <StyledLink as={Link} to="/hosting">
          <StyledIconSection>
            <StyledHouseIcon />
          </StyledIconSection>
          <StyledLabelSection>
            <p>Manage listings</p>
          </StyledLabelSection>
        </StyledLink>
      ) : null}

      {user ? (
        <StyledLink as={Link} to="/addListing">
          <StyledIconSection>
            <StyledAddIcon />
          </StyledIconSection>
          <StyledLabelSection>
            <p>Add listing</p>
          </StyledLabelSection>
        </StyledLink>
      ) : null}

      {user ? (
        <StyledLink
          as="button"
          type="button"
          onClick={async () => {
            await _handleLogout();
            history.push('/');
          }}
        >
          <StyledIconSection>
            <StyledLogoutIcon />
          </StyledIconSection>
          <StyledLabelSection>
            <p>Log out</p>
          </StyledLabelSection>
        </StyledLink>
      ) : (
        <StyledLink as={Link} to="/login">
          <StyledIconSection>
            <StyledLoginIcon />
          </StyledIconSection>
          <StyledLabelSection>
            <p>Log in</p>
          </StyledLabelSection>
        </StyledLink>
      )}

    </StyledMobileNavBar>
  );
}
