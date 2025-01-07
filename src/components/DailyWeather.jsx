import { useContext } from 'react';
import { GlobalStoreContext } from './Store';
import DailyWeatherItem from './DailyWeatherItem.jsx';
import { DATE_TIME_OPTIONS } from '../model/model.js';

export default function DailyWeather() {
  const { globalState } = useContext(GlobalStoreContext);
  const DAYS_TO_DISPLAY = 3;

  const displayedWeather = globalState.jsonData.daily.slice(1, DAYS_TO_DISPLAY + 1) || [];
  const isCelsius = globalState.tInC;

  const dateOptions = {
    ...DATE_TIME_OPTIONS.date.shortWithWeekday,
    timeZone: globalState.jsonData.timezone
  };

  return (
    <div className="dailyWeatherContainer">
      {displayedWeather.map((day) => (
        <DailyWeatherItem key={day.dt} day={day} dateOptions={dateOptions} isCelsius={isCelsius} />
      ))}
    </div>
  );
}
