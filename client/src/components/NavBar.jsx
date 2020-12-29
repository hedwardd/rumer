import React from 'react';
import { Link } from 'react-router-dom';
import NavDropDown from './NavDropDown';
import NavDatePicker from './NavDatePicker';
import { StyledNavBar, StyledNavLink } from './styles/NavBarStyles';

const NavBar = (props) => {
  const { user, _handleLogout } = props;
  const isAuthenticated = !!user;

  return (
    <StyledNavBar>

      <StyledNavLink
        as={Link}
        to="/"
      >
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
          <StyledNavLink
            as={Link}
            to="/login"
          >
            <p>Log in</p>
          </StyledNavLink>
        )}

    </StyledNavBar>
  );
};

export default NavBar;
