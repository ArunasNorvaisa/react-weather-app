import React, { useContext, useEffect, useState } from 'react';
import { Ripple } from 'react-css-spinners/dist/Ripple';
import { GlobalStoreContext } from './Store';
import axios from 'axios';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';

export default function Weather() {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  // IF YOU ARE NOT USING PROXY, UNCOMMENT FOLLOWING LINES:
  // const API_KEY_OPENWEATHER = process.env.REACT_APP_API_KEY_OW;
  // let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
  // WEATHER_URL_HOME += 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&appid=';
  // WEATHER_URL_HOME += `${API_KEY_OPENWEATHER}&lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  // IF YOU ARE USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO proxy.php OR
  // COMMENT THIS VARIABLE IF YOU ARE NOT USING PROXY:
  let WEATHER_URL_HOME = 'https://reactweatherapp.com/proxy/proxy.php';
  WEATHER_URL_HOME += `?lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  useEffect(() => {
    fetchWeather();
  }, [globalStore.latitude]);

  const fetchWeather = async () => {
    setWeatherLoaded(false);
    try {
      const res = await axios.get(WEATHER_URL_HOME);
      setGlobalStore({...globalStore, JSON: res.data, isAppLoaded: true});
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({...globalStore, error: err});
    } finally {
      setWeatherLoaded(true);
    }
  };

  const handleTemperatureUnitChange = event => {
    event.preventDefault();
    setGlobalStore({...globalStore, tInC: !globalStore.tInC});
  };

  return (
    weatherLoaded
    ? <div>
      <WeatherByTheHour />
      <div className="renderedWeather">
        <button className="cOrF" onClick={handleTemperatureUnitChange}>
          Switch to &deg;{globalStore.tInC ? 'F' : 'C'}
        </button>
        <div className="leftPanel">
          <div className='cityName'>{globalStore.city}</div>
          <WeatherNow />
        </div>
        <div className="rightPanel">
          <DailyWeather />
        </div>
      </div>
    </div>
    : <div className="loadingDiv"><Ripple size={154} /></div>
  );
}
