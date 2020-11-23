import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavDropDown from "./NavDropDown";

const StyledNavBar = styled.nav`
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 0 2vw;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const NavBar = props => {

    let { isAuthenticated, user, _handleLogout } = props;

    return (
        <StyledNavBar>

            <StyledLink to="/">Home</StyledLink>
        
            <StyledLink to="/browse">Browse</StyledLink>
            
            {isAuthenticated
                ? (<NavDropDown user={user} _handleLogout={_handleLogout} />)
                : (<StyledLink to="/login">Log in</StyledLink>)}
            
        </StyledNavBar>
    );
};

export default NavBar;