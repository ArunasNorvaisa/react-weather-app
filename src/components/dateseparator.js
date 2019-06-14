import React from 'react';
import { getTime, getDate } from "../functions/functions";

const DateSeparator = props => {

  const getWeekday = unixTime => {
    let timeOptions = {
      timeZone: props.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const time = getTime(unixTime, timeOptions);
    timeOptions = {
      weekday: 'long',
      timeZone: props.timezone
    };
    const weekday = getDate(unixTime, timeOptions);
    if(time === "00:00") return weekday;
  };

  return getWeekday(props.time) ?
    <div className="weekday">{ getWeekday(props.time) }</div> :
    null;
};

export default DateSeparator;
