import React, {useContext} from 'react';
import { GlobalStoreContext } from './Store';
import { CtoF, getDate } from "../functions/functions";

function DailyWeather({date}) {
  const [globalStore] = useContext(GlobalStoreContext);

  let { icon, time, temperatureLow, temperatureHigh, summary } = globalStore.JSON.daily.data[date];
  const icon_URL = `./images/icons/${icon}.svg`;
  // Calculating temperature in Fahrenheit
  if (!globalStore.tInC) {
    temperatureLow = CtoF(temperatureLow);
    temperatureHigh = CtoF(temperatureHigh);
  }

  return (
    <div className='dailyWeather'>
      <div>
        <div className='icon'>
          <img src={icon_URL} alt='icon'/>
        </div>
        <div className='date'>
          {getDate(time, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              timeZone: globalStore.JSON.timezone
            }
          )}
        </div>
        <div className='tToday'>
          {temperatureLow.toFixed(0)}&deg;
          /&nbsp;
          {temperatureHigh.toFixed(0)}&deg;
          {globalStore.tInC ? 'C' : 'F'}
        </div>
        <div className="forecastSummary">{summary}</div>
        <hr/>
      </div>
    </div>
  );
}

export default DailyWeather;