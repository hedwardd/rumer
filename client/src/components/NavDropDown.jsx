import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDropDown = styled.div`
    min-width: 5vw;
    min-height: 4vh;
`;

const DropDownButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    min-width: 5vw;
    height: 42px;
    text-decoration: none;
    font-size: 14px;
    padding: 5px 10px;
    position: relative;
    vertical-align: middle;
    border-radius: 10px;
    background-color: white;
    border: 1px solid #DDDDDD;
    border-radius: 21px;
    z-index: 1;
    box-shadow: ${props => 
        props.isOpen
        ? "0px 8px 16px 0px rgba(0,0,0,0.2)" 
        : ""
    };
`;

const DropDownContainer = styled.div`
    position: absolute;
    box-sizing: border-box;
    top: 4vw;
    right: 1vw;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 2;
    border-radius: 12px;
    line-height: 20px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 8px 0;
`;

const DropDownLink = styled(Link)`
    font-weight: ${props => props.primary ? "bold" : "normal"};
    color: black;
    cursor: pointer;
    box-sizing: border-box;
    background-color: transparent;
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    font-size: 14px;
    line-height: 18px;
    margin: 0;
    outline: none;
    overflow: visible;
    quotes: auto;
    text-align: start;
    text-decoration: none;
    user-select: auto;
    white-space: nowrap;
    width: 100%;
    z-index: 3;
    &:hover {
        background-color: #F7F7F7;
    }
`;

const MenuDivider = styled.div`
    background-color: #DDDDDD;
    box-sizing: border-box;
    height: 1px;
    line-height: 20px; 
    margin: 8px 0;
`;

class NavDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
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
        let isOpen = this.state.showMenu;

        return (
            <StyledDropDown onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>

                <DropDownButton isOpen={isOpen}>
                    <p>{username}</p>
                </DropDownButton>

                {
                    this.state.showMenu
                        ? (
                            <DropDownContainer>

                                <DropDownLink onClick={this.hideMenu} to="/bookings">My Reservations</DropDownLink>

                                <MenuDivider />
                
                                <DropDownLink onClick={this.hideMenu} to="/hosting">Manage Listings</DropDownLink>
                
                                <DropDownLink onClick={this.hideMenu} to="/addListing">Add Listing</DropDownLink>

                                <MenuDivider />
                
                                <DropDownLink as={"div"} onClick={this.props._handleLogout}>Log out</DropDownLink>
                
                            </DropDownContainer>
                        )
                        : (null)
                }
                
            </StyledDropDown>
        );
    }

};

export default NavDropDown;