import React, { useContext } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import DateSeparator from './DateSeparator';
import { GlobalStoreContext } from "./Store";

const WeatherByTheHour = props => {
  const [globalStore] = useContext(GlobalStoreContext);

  const items = props.JSON.hourly.data.map(item => {
    return (
      <>
        <div className="renderedHourlyWeather">
          <DateSeparator
            key={item.time + 1}
            time={item.time}
            timezone={globalStore.JSON.timezone}
          />
          <HourlyWeatherItem
            key={item.time}
            item={item}
            JSON={globalStore.JSON}
            isTemperatureInC={globalStore.tInC}
          />
        </div>
      </>
    );
  });
  return <div className="weatherByTheHour">{items}</div>;
};

export default WeatherByTheHour;
