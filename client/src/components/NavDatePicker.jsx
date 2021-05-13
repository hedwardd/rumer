import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import { StyledNavDatePicker, SearchButton, StyledSearchIcon } from './styles/NavDatePickerStyles';

export default function NavDatePicker() {
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [focusedInput, setFocusedInput] = useState(null);

  const [mQuery, setMQuery] = React.useState({
    matches: window.innerWidth <= 768,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', setMQuery);
    // cleanup function to remove the listener
    return () => mediaQuery.removeEventListener(setMQuery);
  }, []);

  const checkInParam = dates.startDate ? dates.startDate.format('x') : null;
  const checkOutParam = dates.endDate ? dates.endDate.format('x') : null;

  return (
    <StyledNavDatePicker>
      <DateRangePicker
        required
        startDate={dates.startDate} // momentPropTypes.momentObj or null,
        startDateId="nav_date_picker_start" // PropTypes.string.isRequired,
        endDate={dates.endDate} // momentPropTypes.momentObj or null,
        endDateId="nav_date_picker_end" // PropTypes.string.isRequired,
        onDatesChange={setDates} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocusedInput}
        numberOfMonths={mQuery.matches ? 1 : 2}
      />

      <SearchButton
        as={Link}
        to={(checkInParam && checkOutParam)
          ? `/browse?checkIn=${checkInParam}&checkOut=${checkOutParam}`
          : '/browse'}
      >
        <StyledSearchIcon />
      </SearchButton>

    </StyledNavDatePicker>
  );
}
