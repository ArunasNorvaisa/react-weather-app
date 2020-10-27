import React from 'react';
import { KtoC, KtoF, getIcon, getTime } from '../functions/functions';

const HourlyWeatherItem = props => {
  const icon = getIcon(`${props.item.weather[0].icon}`);
  const icon_URL = `./images/icons/${icon}.svg`;
  let temperature;

  props.isTemperatureInC
    ? temperature = KtoC(props.item.temp).toFixed(0)
    : temperature = KtoF(props.item.temp).toFixed(0);

  const timeOptions = {
    timeZone: props.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  return (
    <div className="hourlyWeatherItem">
      <div>{getTime(props.item.dt, timeOptions)}</div>
      <div><img src={icon_URL} alt={icon} /></div>
      <div>{temperature}&deg;{props.isTemperatureInC ? 'C' : 'F'}</div>
      {props.item.pop !== 0 &&
        <div>
          {(props.item.pop * 100).toFixed(0)}%
        </div>
      }
    </div>
  );
};

export default HourlyWeatherItem;
