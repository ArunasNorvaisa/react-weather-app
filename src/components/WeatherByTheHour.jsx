import { Fragment } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import DateSeparator from './DateSeparator';

export default function WeatherByTheHour(props) {
  const { hourlyWeatherItems, timezone, tInC } = props;

  const items = hourlyWeatherItems.map((item) => {
    return (
      <Fragment key={item.dt}>
        <div className="renderedHourlyWeather">
          <DateSeparator key={item.dt + 1} unixTime={item.dt} timezone={timezone} />
          <HourlyWeatherItem key={item.dt} item={item} timezone={timezone} isTemperatureInC={tInC} />
        </div>
      </Fragment>
    );
  });

  return <div className="weatherByTheHour">{items}</div>;
}
