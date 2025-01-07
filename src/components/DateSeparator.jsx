import { DATE_TIME_OPTIONS, getDate, getTime } from '../model/model.js';

export default function DateSeparator({ unixTime, timezone }) {
  const timeOptions = {
    ...DATE_TIME_OPTIONS.time.noSeconds24hours,
    timeZone: timezone
  };

  const dateOptions = {
    ...DATE_TIME_OPTIONS.date.weekdayOnly,
    timeZone: timezone
  };

  const time = getTime(unixTime, timeOptions);

  const displayDateSeparator = time === '00:00' || time === '24:00';

  return displayDateSeparator && <div className="weekday">{getDate(unixTime, dateOptions)}</div>;
}
