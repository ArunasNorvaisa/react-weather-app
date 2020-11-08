import React from 'react';
import { KtoC, KtoF, getIcon, getTime } from '../functions/functions';

export default function useHourlyWeatherItem ({ item, isTemperatureInC, timezone }) {
  const icon = getIcon(`${item.weather[0].icon}`);
  const icon_URL = require(`../static/images/icons/${icon}.svg`);
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

  return {
    icon,
    icon_URL,
    temperature,
    timeOptions,
    getTime,
    prepType
  };
}
