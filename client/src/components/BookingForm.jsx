import React, { Component } from 'react';
import styled from "styled-components";

const StyledBookingForm = styled.div`
    width: 33.33%;
    border: 1px solid #DDDDDD;
    border-radius: 12px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 6px 16px;
    box-sizing: border-box;
    color: #222222;
    line-height: 20px;
    padding: 24px;
    quotes: auto;
`;

const DateInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReserveButton = styled.input`
    background-image: linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%);
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin: 0;
    outline: none;
    padding: 14px 24px;
    position: relative;
    quotes: auto;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    width: 100%;
    &:active {
        background-color: #FF385C; transform: scale(.96);
    }
`;

class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                checkIn: "",
                checkOut: ""
            },
        isSubmitting: false,
        isError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async event => {
        event.preventDefault();

        console.log(this.props.user);

        let isLoggedOut = Object.keys(this.props.user).length === 0;

        // If user is not logged in, redirect to login page
        if (isLoggedOut) {
            window.open("/login", "_self")
        } else {
            // Otherwise, submit booking
            this.setState({ isSubmitting: true });

            const bookingObject = { 
                ...this.state.values,
                _associatedListing: this.props.listingId 
            };

            const res = await fetch("/api/bookings", { 
                method: "POST",
                body: JSON.stringify(bookingObject),
                headers: { "Content-Type": "application/json" } 
            });
            this.setState({ isSubmitting: false });
            const data = await res.json();
            !data.hasOwnProperty("error")
                ? this.setState({ message: data.success })
                : this.setState({ message: data.error, isError: true });
            setTimeout(() => this.setState({ 
                isError: false,
                message: "",
                values: { 
                    checkIn: "",
                    checkOut: "" 
                } 
                }),
            1600
            );
        }
    };

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            values: { 
                ...this.state.values, 
                [name]: value
            
            }
        });
    }

    render() {
        return (
            <StyledBookingForm>
                <form onSubmit={this.handleSubmit} className="form">
                    <DateInputContainer>
                        <div>

                            <label>
                                Check In Date:
                                <input
                                    type="date"
                                    required
                                    id="checkIn"
                                    name="checkIn"
                                    label="checkIn"
                                    value={this.state.values.checkIn}
                                    onChange={this.handleChange}
                                />
                            </label>

                        </div>

                        <div>

                            <label>
                                Check Out Date:
                                <input
                                    type="date"
                                    required
                                    id="checkOut"
                                    name="checkOut"
                                    label="checkOut"
                                    value={this.state.values.checkOut}
                                    onChange={this.handleChange}
                                />
                            </label>
                            
                        </div>

                    </DateInputContainer>
                    
                    <ReserveButton type="submit" value="Reserve" />
                </form>
                <div>
                {this.state.isSubmitting ? "Submitting..." : this.state.message}
                </div>
            </StyledBookingForm>
        );
    }
}

export default BookingForm;