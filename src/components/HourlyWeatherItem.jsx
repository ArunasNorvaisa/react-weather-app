import React from 'react';
import { KtoC, KtoF, getIcon, getTime } from '../functions/functions';

export default function HourlyWeatherItem ({ item, isTemperatureInC, timezone }) {
  const icon = getIcon(`${item.weather[0].icon}`);
  const icon_URL = `../static/images/icons/${icon}.svg`;
  let temperature;

  isTemperatureInC
    ? temperature = KtoC(item.temp).toFixed(0)
    : temperature = KtoF(item.temp).toFixed(0);

  const timeOptions = {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const prepType = () => {
    if ('rain' in item) return 'rain ';
    else if ('snow' in item) return 'snow ';
    return '';
  };

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
