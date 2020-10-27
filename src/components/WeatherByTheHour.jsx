import React, { Fragment, useContext } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import DateSeparator from './DateSeparator';
import { GlobalStoreContext } from './Store';
import '../css/style.scss';

function WeatherByTheHour() {
  const [globalStore] = useContext(GlobalStoreContext);

  const items = globalStore.JSON.hourly.data.map(item => {
    return (
      <Fragment key={item.time}>
        <div className='renderedHourlyWeather'>
          <DateSeparator
            key={item.time + 1}
            time={item.time}
            timezone={globalStore.JSON.timezone}
          />
          <HourlyWeatherItem
            key={item.time}
            item={item}
            timezone={globalStore.JSON.timezone}
            isTemperatureInC={globalStore.tInC}
          />
        </div>
      </Fragment>
    );
  });

  return <div className='weatherByTheHour'>{items}</div>;
}

export default WeatherByTheHour;
