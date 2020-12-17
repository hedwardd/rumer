import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../search.svg';

const SearchButton = styled.div`
  background-color: #FF385C;
  border-radius: 50%;
  color: #FFFFFF;
  padding: 10px;
  width: 32px;
  height: 32px;
  margin-left: 25px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 12px;
  height: 12px;
  color: white;
`;

export default function NavDatePicker() {
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [focusedInput, setFocusedInput] = useState(null);

  const checkInParam = dates.startDate ? dates.startDate.format('x') : null;
  const checkOutParam = dates.endDate ? dates.endDate.format('x') : null;

  return (
    <div>
      <DateRangePicker
        required
        startDate={dates.startDate} // momentPropTypes.momentObj or null,
        startDateId="nav_date_picker_start" // PropTypes.string.isRequired,
        endDate={dates.endDate} // momentPropTypes.momentObj or null,
        endDateId="nav_date_picker_end" // PropTypes.string.isRequired,
        onDatesChange={setDates} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocusedInput}
      />

      <SearchButton
        as={Link}
        to={(checkInParam && checkOutParam)
          ? `/browse?checkIn=${checkInParam}&checkOut=${checkOutParam}`
          : '/browse'}
      >
        <StyledSearchIcon />
      </SearchButton>

    </div>
  );
}
