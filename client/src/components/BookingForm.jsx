import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import styled from "styled-components";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import isWithinInterval from "date-fns/isWithinInterval";

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
            haveDatesLoaded: false,
            bookedDates: [],
            checkIn: null,
            checkOut: null
        };

        this._onDatesChange = this._onDatesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getBookedDates = this.getBookedDates.bind(this);
        this.isDayBlocked = this.isDayBlocked.bind(this);
    }

    componentDidMount() {
        this.getBookedDates(this.props.listingId);
    }
    
    getBookedDates = (listingId) => {
        fetch("/api/bookings/" + listingId, {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(bookings => bookings
                .map(eachBooking => ({start: new Date(eachBooking.checkIn), end: new Date(eachBooking.checkOut)})))
            .then(intervals => this.setState({ haveDatesLoaded: true, bookedDates: intervals }));
    }

    isDayBlocked = day => {
        let dateOfDay = day._d;
        const bookedDates = this.state.bookedDates;
        return bookedDates.length === 0
            ? false
            : !bookedDates.every(bookedInterval => !isWithinInterval(dateOfDay, bookedInterval));

    }

    _onDatesChange = ({ startDate, endDate }) => {
        this.setState({
            checkIn: startDate,
            checkOut: endDate
        });
    }

    // TO-DO: Clean up the old state values from here
    handleSubmit = async event => {
        event.preventDefault();

        let isLoggedOut = Object.keys(this.props.user).length === 0;

        // If user is not logged in, redirect to login page
        if (isLoggedOut) {
            window.open("/login", "_self")
        } else {
            // Otherwise, submit booking
            this.setState({ isSubmitting: true });

            const bookingObject = { 
                checkIn: this.state.checkIn,
                checkOut: this.state.checkOut,
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
                checkIn: null,
                checkOut: null 
                }),
            1600
            );
        }
    };

    render() {

        const haveDatesLoaded = this.state.haveDatesLoaded;
        
        return (
            <StyledBookingForm>

                <form onSubmit={this.handleSubmit} className="form">

                    <DateInputContainer>

                        { haveDatesLoaded ? (
                            <DateRangePicker
                                required
                                startDate={this.state.checkIn} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={this.state.checkOut} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={this._onDatesChange} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                isDayBlocked={this.isDayBlocked}
                            />

                        ) : null }

                    </DateInputContainer>
                    
                    <ReserveButton
                        type="submit"
                        value="Reserve"
                    />

                </form>
                
            </StyledBookingForm>
        );
    }
}

export default BookingForm;