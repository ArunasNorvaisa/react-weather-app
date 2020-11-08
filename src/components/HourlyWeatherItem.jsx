import React from 'react';
import useHourlyWeatherItem from '../hooks/useHourlyWeatherItem';

export default function HourlyWeatherItem ({ isTemperatureInC, item, timezone }) {
  const {
    icon,
    icon_URL,
    temperature,
    timeOptions,
    getTime,
    prepType
  } = useHourlyWeatherItem({ isTemperatureInC, item, timezone });

  return (
    <div className="hourlyWeatherItem">
      <div>{getTime(item.dt, timeOptions)}</div>
      <div><img src={icon_URL} alt={icon} /></div>
      <div>{temperature}&deg;{isTemperatureInC ? 'C' : 'F'}</div>
      {item.pop !== 0 &&
        <div>
          {prepType()}
          {(item.pop * 100).toFixed(0)}
          %
        </div>
      }
    </div>
  );
}
