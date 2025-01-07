import { useContext } from 'react';
import { DATE_TIME_OPTIONS, iconCodeToFileMapper, kelvinsToCelcius, kelvinsToFahrenheit } from '../model/model.js';
import { GlobalStoreContext } from '../components/Store';

export default function useWeatherNow() {
  const { globalState } = useContext(GlobalStoreContext);
  const { jsonData, tInC } = globalState;
  const { current, daily, timezone } = jsonData;
  const { weather, temp, sunrise, sunset, dt } = current;

  const icon = iconCodeToFileMapper[`${weather[0].icon}`] ?? 'clear-day';
  const toTemp = tInC ? kelvinsToCelcius : kelvinsToFahrenheit;
  const temperatures = {
    now: toTemp(temp),
    min: toTemp(daily[0].temp.min),
    max: toTemp(daily[0].temp.max)
  };

  const { pop, ...weatherTypes } = daily[0];
  const prepType = ['rain', 'snow'].find((type) => type in weatherTypes) || '';
  const precipitation = `${prepType} ${(pop * 100).toFixed(0)}%`;

  const dateOptions = {
    ...DATE_TIME_OPTIONS.date.fullWithTime,
    timeZone: timezone
  };

  return {
    dateOptions,
    icon,
    icon_URL: `/images/icons/${icon}.svg`,
    precipitation,
    sunrise,
    sunset,
    tInC,
    temperatures,
    timeNow: dt,
    timezone,
    weatherDescription: daily[0].summary,
    weatherMain: weather[0].main
  };
}
