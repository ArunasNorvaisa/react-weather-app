import React, { Fragment, useContext } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import DateSeparator from './DateSeparator';
import { GlobalStoreContext } from './Store';

export default function WeatherByTheHour() {
  const [globalStore] = useContext(GlobalStoreContext);

  const items = globalStore.JSON.hourly.map(item => {
    return (
      <Fragment key={item.dt}>
        <div className='renderedHourlyWeather'>
          <DateSeparator
            key={item.dt + 1}
            time={item.dt}
            timezone={globalStore.JSON.timezone}
          />
          <HourlyWeatherItem
            key={item.dt}
            item={item}
            timezone={globalStore.JSON.timezone}
            isTemperatureInC={globalStore.tInC}
          />
        </div>
      </Fragment>
    );
  });

  return <div className="weatherByTheHour">{items}</div>;
}
