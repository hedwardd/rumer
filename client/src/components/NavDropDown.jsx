import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDropDown = styled.div`
    min-width: 5vw;
    min-height: 4vh;
    text-align: center;
`;

const DropDownButton = styled.button`
    min-width: 5vw;
    min-height: 4vh;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 10px;
    background-color: white;
    border-width: 1px;
    &:hover {
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }
`;

const DropDownContent = styled.div`
    position: absolute;
    top: 4vw;
    right: 1vw;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

const DropDownLink = styled(Link)`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
`;

class NavDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    showMenu(event) {
        this.setState({
            showMenu: true
        });
    }

    hideMenu(event) {
        this.setState({
            showMenu: false
        });
    }
    

    render() {

        let username = this.props.user.username;

        return (
            <StyledDropDown onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>

                <DropDownButton>
                    {username}
                </DropDownButton>

                {
                    this.state.showMenu
                        ? (
                            <DropDownContent>
                
                                <DropDownLink onClick={this.hideMenu} to="/hosting">Manage Listings</DropDownLink>
                
                                <DropDownLink onClick={this.hideMenu} to="/addListing">Add Listing</DropDownLink>
                
                                <DropDownLink onClick={this.hideMenu} to="/bookings">My Bookings</DropDownLink>
                
                                <DropDownLink onClick={this.props._handleLogout}>Log out</DropDownLink>
                
                            </DropDownContent>
                        )
                        : (null)
                }
                
            </StyledDropDown>
        );
    }

};

export default NavDropDown;