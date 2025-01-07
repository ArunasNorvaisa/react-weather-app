import { SpinnerRoundOutlined } from 'spinners-react';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';
import useWeather from '../hooks/useWeather.js';

export default function Weather() {
  const { city, hourlyWeatherItems, weatherLoaded, timezone, tInC, handleTemperatureUnitChange } = useWeather();

  if (!weatherLoaded) {
    return (
      <div className="loadingDiv">
        <SpinnerRoundOutlined size={88} thickness={100} speed={134} color="rgba(172, 57, 128, 1)" />
      </div>
    );
  }

  return (
    <div>
      <WeatherByTheHour hourlyWeatherItems={hourlyWeatherItems} timezone={timezone} tInC={tInC} />
      <div className="renderedWeather">
        <button className="cOrF" onClick={handleTemperatureUnitChange}>
          Switch to &deg;{tInC ? 'F' : 'C'}
        </button>
        <div className="leftPanel">
          <div className="cityName">{city}</div>
          <WeatherNow />
        </div>
        <div className="rightPanel">
          <DailyWeather />
        </div>
      </div>
    </div>
  );
}
