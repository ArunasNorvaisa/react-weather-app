import { memo } from 'react';
import { DATE_TIME_OPTIONS, getDate, getTime } from '../model/model.js';

const {
  time: { noSeconds24hours },
  date: { weekdayOnly }
} = DATE_TIME_OPTIONS;

function DateSeparator({ unixTime, timezone }) {
  const time = getTime(unixTime, { ...noSeconds24hours, timeZone: timezone });

  if (time !== '00:00' && time !== '24:00') {
    return;
  }

  const date = getDate(unixTime, { ...weekdayOnly, timeZone: timezone });

  return <div className="weekday">{date}</div>;
}

export default memo(DateSeparator);
