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
    &:hover {
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }
`;

const NavBar = props => {

    let { isAuthenticated, user, _handleLogout } = props;

    return (
        <StyledNavBar>

            <StyledLink to="/">
                <p>Home</p>
            </StyledLink>
        
            <StyledLink to="/browse">
                <p>Browse</p>
            </StyledLink>
            
            {isAuthenticated
                ? (<NavDropDown user={user} _handleLogout={_handleLogout} />)
                : (<StyledLink to="/login">
                        <p>Log in</p>
                    </StyledLink>)}
            
        </StyledNavBar>
    );
};

export default NavBar;