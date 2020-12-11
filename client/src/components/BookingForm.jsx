import React, { useState, useEffect } from "react";
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

const getBookedDates = async (listingId) => {
	const response = await fetch("/api/bookings/" + listingId, {
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
	if (response.status !== 200) return null;
	else {
		const bookings = await response.json();
		const bookedDates = bookings.map(eachBooking =>
			({start: new Date(eachBooking.checkIn), end: new Date(eachBooking.checkOut)}));
		return bookedDates;
	}
}

const handleSubmit = async (dates, listingId) => {

		// Otherwise, submit booking
		// this.setState({ isSubmitting: true });

		const bookingObject = { 
			checkIn: dates.checkIn,
			checkOut: dates.checkOut,
			_associatedListing: listingId 
		};

		const response  = await fetch("/api/bookings", { 
			method: "POST",
			body: JSON.stringify(bookingObject),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true
			} 
		});
		if (response.status !== 200) return null;
		else {
			const data = await response.json();
			return data;
		}
	// 	!data.hasOwnProperty("error")
	// 		? this.setState({ message: data.success })
	// 		: this.setState({ message: data.error, isError: true });
	// 	setTimeout(() => this.setState({
	// 		checkIn: null,
	// 		checkOut: null 
	// 		}),
	// 	1600
	// 	);
	// }
};

// TO-DO: Update BookingForm to reflect loading, success/fail of submission
export default function BookingForm ({user, listingId}) {

	const [dates, setDates] = useState({checkIn: null, checkOut: null});
	const [focusedInput, setFocusedInput] = useState(null);

	const [bookedDates, setBookedDates] = useState(null);
	useEffect(() => {
		if (!bookedDates && listingId) {
			async function fetchBookedDates() {
				const fetchResult = await getBookedDates(listingId);
				if (fetchResult) setBookedDates(fetchResult);
			}
			fetchBookedDates();
		}
	}, [user, listingId, bookedDates]);

	const isDayBlocked = (day) => {
		const dateOfDay = day._d;
		return bookedDates.length === 0
			? false
			: !bookedDates.every(bookedInterval => !isWithinInterval(dateOfDay, bookedInterval));

	}
		
	return (
		<StyledBookingForm>

			<form
				onSubmit={event => {
						event.preventDefault();
						user
							? handleSubmit(dates, listingId)
							: window.open("/login", "_self")
					}
				}
			>

				<DateInputContainer>

					{ bookedDates ? (
						<DateRangePicker
							required
							startDate={dates.checkIn} // momentPropTypes.momentObj or null,
							startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
							endDate={dates.checkOut} // momentPropTypes.momentObj or null,
							endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
							onDatesChange={({startDate, endDate}) => setDates({
								checkIn: startDate,
								checkOut: endDate
								})} // PropTypes.func.isRequired,
							focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
							onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
							isDayBlocked={isDayBlocked}
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