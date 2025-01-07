import { useContext } from 'react';
import {
  DATE_TIME_OPTIONS,
  getTime,
  iconCodeToFileMapper,
  kelvinsToCelcius,
  kelvinsToFahrenheit
} from '../model/model.js';
import { GlobalStoreContext } from '../components/Store.jsx';

export default function useHourlyWeatherItem({ item, isTemperatureInC, timezone }) {
  const { globalState } = useContext(GlobalStoreContext);
  const icon = iconCodeToFileMapper[`${item.weather[0].icon}`] ?? 'clear-day';
  const temperature = isTemperatureInC ? kelvinsToCelcius(item.temp) : kelvinsToFahrenheit(item.temp);

  const timeOptions = {
    ...DATE_TIME_OPTIONS.time.noSeconds24hours,
    timeZone: timezone
  };

  const prepType = () => {
    const weatherTypes = ['rain', 'snow'];
    const prepType = weatherTypes.find((type) => type in item);
    return prepType ? `${prepType} ` : '';
  };

  return {
    icon,
    icon_URL: `/images/icons/${icon}.svg`,
    temperature,
    timeOptions,
    getTime,
    prepType
  };
}
