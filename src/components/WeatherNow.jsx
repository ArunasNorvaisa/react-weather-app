import SunCycle from './SunCycle';
import useWeatherNow from '../hooks/useWeatherNow';
import { getDate } from '../model/model.js';

export default function WeatherNow() {
  const {
    dateOptions,
    icon,
    icon_URL,
    precipitation,
    sunrise,
    sunset,
    tInC,
    temperatures,
    timeNow,
    timezone,
    weatherDescription,
    weatherMain
  } = useWeatherNow();

  return (
    <div className="todayWeather">
      <SunCycle sunrise={sunrise} sunset={sunset} timezone={timezone} />
      <div>
        {temperatures.min} / {temperatures.max}&deg;{tInC ? 'C' : 'F'}
      </div>
      <div>{weatherMain}</div>
      <div className="tNow">
        {temperatures.now}&deg;{tInC ? 'C' : 'F'}
        <img src={icon_URL} alt={icon} />
      </div>
      {/* showing precipitation only if it's expected */}
      <div>{precipitation}</div>
      <div className="timeNow">{getDate(timeNow, dateOptions)}</div>
      <hr />
      <div>{weatherDescription}</div>
    </div>
  );
}
