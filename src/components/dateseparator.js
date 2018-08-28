import React from 'react';

const DateSeparator = (props) => {
    const getWeekday = unixTime => {
        let options = { timeZone: props.timezone, hour: '2-digit', minute: '2-digit', hour12: false };
        const time = new Date(unixTime * 1e3).toLocaleTimeString('en', options);
        options = { weekday: 'long', timeZone: props.timezone };
        const weekday = new Date(unixTime * 1e3).toLocaleDateString('en', options);
        if(time === "00:00") {
            return weekday;
        } else {
            return null;
        }
    }
    return getWeekday(props.time)
        ? <div className="weekday">{ getWeekday(props.time) }</div>
        : null;
}

export default DateSeparator;
