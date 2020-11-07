import React from 'react';
import SunCycle from './SunCycle';
import useWeatherNow from '../hooks/useWeatherNow';

export default function WeatherNow() {
  const {
    icon,
    icon_URL,
    sunrise,
    sunset,
    temperatureMax,
    temperatureMin,
    temperatureNow,
    timeNow,
    timeOptions,
    timezone,
    tInC,
    weatherDescription,
    weatherMain,
    getDate,
    getPrecipitation
  } = useWeatherNow();

  return (
    <div className="todayWeather">
      <SunCycle
        sunrise={sunrise}
        sunset={sunset}
        timezone={timezone}
      />
      <div>{temperatureMin} / {temperatureMax}&deg;{tInC ? 'C' : 'F'}</div>
      <div>{weatherMain}</div>
      <div className="tNow">{temperatureNow}&deg;{tInC ? 'C' : 'F'}
        <img src={icon_URL} alt={icon} />
      </div>
      {getPrecipitation()} {/* showing precipitation only if it's expected */}
      <div className="timeNow">{getDate(timeNow, timeOptions)}</div>
      <hr />
      <div>{weatherDescription}</div>
    </div>
  );
}
