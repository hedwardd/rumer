import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import isWithinInterval from 'date-fns/isWithinInterval';
import {
  StyledBookingForm, FormContentWrapper, StyledDateRangePicker, ReserveButton,
} from './styles/BookingFormStyles';

const getBookedDates = async (listingId) => {
  const response = await fetch(`/api/bookings/${listingId}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) return null;

  const bookings = await response.json();
  const bookedDates = bookings
    .map((eachBooking) => ({
      start: new Date(eachBooking.checkIn),
      end: new Date(eachBooking.checkOut),
    }));
  return bookedDates;
};

const postBooking = async (dates, listingId) => {
  const bookingObject = {
    checkIn: dates.checkIn,
    checkOut: dates.checkOut,
    _associatedListing: listingId,
  };

  const response = await fetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingObject),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  if (response.status !== 200) return null;

  const data = await response.json();
  return data;
};

export default function BookingForm({ user, listingId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [dates, setDates] = useState({ checkIn: null, checkOut: null });
  const [focusedInput, setFocusedInput] = useState(null);

  const [bookedDates, setBookedDates] = useState(null);
  useEffect(() => {
    async function fetchBookedDates() {
      const fetchResult = await getBookedDates(listingId);
      if (fetchResult) setBookedDates(fetchResult);
    }
    if (!bookedDates && listingId) fetchBookedDates();
  }, [user, listingId, bookedDates]);

  const isDayBlocked = (thisDay) => {
    const dateOfThisDay = thisDay._d;
    return bookedDates.length === 0
      ? false
      : !bookedDates.every((bookedInterval) => !isWithinInterval(dateOfThisDay, bookedInterval));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) window.open('/login', '_self');
    else {
      setIsSubmitting(true);
      const result = await postBooking(dates, listingId);
      setIsSubmitting(false);
      if (result.error) setMessage(result.error);
      else if (result) {
        setMessage('Your reservation was successful!');
        setTimeout(() => {
          setMessage('');
          setDates({ checkIn: null, checkOut: null });
        }, 3000);
      } else {
        setMessage('Something went wrong.  Please try again.');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    }
  };

  return (

    <StyledBookingForm onSubmit={(e) => handleSubmit(e)}>

      { bookedDates ? (
        <FormContentWrapper>
          <StyledDateRangePicker
            as={DateRangePicker}
            required
            startDate={dates.checkIn} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={dates.checkOut} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => setDates({
              checkIn: startDate,
              checkOut: endDate,
            })} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(input) => setFocusedInput(input)} // PropTypes.func.isRequired,
            isDayBlocked={isDayBlocked}
          />

          <ReserveButton
            type="submit"
            value="Reserve"
          />

        </FormContentWrapper>

      ) : null }

      <p>{isSubmitting ? 'Submitting...' : ''}</p>

      <p>{message.length ? message : ''}</p>

    </StyledBookingForm>

  );
}
