import React, {useContext} from 'react';
import { GlobalStoreContext } from './Store';
import { KtoC, KtoF, getDate, getIcon } from '../functions/functions';
import '../css/style.scss';

function DailyWeather({date}) {
  const [globalStore] = useContext(GlobalStoreContext);

  let temperatureLow,
      temperatureHigh;

  let { dt: time, temp, weather } = globalStore.JSON.daily[date];
  const icon = getIcon(`${weather[0].icon}`);
  const icon_URL = `./images/icons/${icon}.svg`;
  // Calculating temperature in Fahrenheit
  if (globalStore.tInC) {
    temperatureLow = KtoC(temp.min);
    temperatureHigh = KtoC(temp.max);
  } else {
    temperatureLow = KtoF(temp.min);
    temperatureHigh = KtoF(temp.max);
  }

  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: globalStore.JSON.timezone
  };

  return (
    <div className="dailyWeather">
      <div>
        <div className="icon">
          <img src={icon_URL} alt='icon'/>
        </div>
        <div className="date">
          {getDate(time, dateOptions)}
        </div>
        <div>
          {temperatureLow.toFixed(0)}&deg;
          /&nbsp;
          {temperatureHigh.toFixed(0)}&deg;
          {globalStore.tInC ? 'C' : 'F'}
        </div>
        <div className="forecastSummary">{weather[0].description}</div>
        <hr/>
      </div>
    </div>
  );
}

export default DailyWeather;
