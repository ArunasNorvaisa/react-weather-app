import React from 'react';
import { getTime, getDate } from '../functions/functions';

export default function DateSeparator(props) {

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
    if(time === '00:00' || time === '24:00') return getDate(unixTime, timeOptions);
    return false;
  };

  return getWeekday(props.time) && <div className="weekday">{getWeekday(props.time)}</div>;
}
