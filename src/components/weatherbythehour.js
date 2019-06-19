import React from 'react';
import HourlyWeatherItem from './hourlyweatheritem';
import DateSeparator from './dateseparator';

const WeatherByTheHour = props => {

  const items = props.JSON.hourly.data.map(item => {
    return <div className="renderedHourlyWeather">
      <DateSeparator
        key={item.time + 1}
        time={item.time}
        timezone={props.JSON.timezone}
      />
      <HourlyWeatherItem
        key={item.time}
        item={item}
        JSON={props.JSON}
        isTemperatureInC={props.isTemperatureInC}
      />
    </div>;
  });
  return <div className="weatherByTheHour">{items}</div>;
};

export default WeatherByTheHour;
