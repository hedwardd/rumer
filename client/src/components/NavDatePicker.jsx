import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-dates";
import styled from "styled-components";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function NavDatePicker () {

    const [dates, setDates] = useState({startDate: null, endDate: null});
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <div>
            <DateRangePicker
                required
                startDate={dates.startDate} // momentPropTypes.momentObj or null,
                startDateId="nav_date_picker_start" // PropTypes.string.isRequired,
                endDate={dates.endDate} // momentPropTypes.momentObj or null,
                endDateId="nav_date_picker_end" // PropTypes.string.isRequired,
                onDatesChange={({startDate, endDate}) => setDates({startDate, endDate})} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                // isDayBlocked={this.isDayBlocked}
            />

            <button onClick={()=>console.log(dates)}>Search</button>

        </div>
    )

}