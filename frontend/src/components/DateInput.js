import React from 'react';
import DatePicker from 'react-date-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';

const DateInput = ({ date, setDate }) => {
    return (
        <DatePicker
            value={date}
            onChange={setDate}
            format="dd-MM-y"
            dayPlaceholder="//"
            monthPlaceholder="//"
            yearPlaceholder="////"
            required={true}
            clearIcon={null}
            calendarIcon={<FaRegCalendarAlt />}
            maxDate={new Date()}
        />
    );
};

export default DateInput;