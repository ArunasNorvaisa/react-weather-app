import React, { useContext, useEffect, useState } from 'react';
import { Ripple } from 'react-css-spinners/dist/Ripple';
import { GlobalStoreContext } from './Store';
import axios from 'axios';
import buildUrl from 'build-url';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';

export default function Weather() {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  // IF YOU ARE USING PROXY, COMMENT THE FOLLOWING 2 VARIABLES OUT:
  const API_KEY_OPENWEATHER = process.env.API_KEY_OW;
  const WEATHER_URL_HOME = buildUrl('https://cors-anywhere.herokuapp.com/', {
    path: 'https://api.openweathermap.org/data/2.5/onecall',
    queryParams: {
      exclude: 'minutely',
      appid: API_KEY_OPENWEATHER,
      lat: globalStore.latitude,
      lon: globalStore.longitude
    }
  });

  // IF YOU ARE USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO weatherproxy.php AND 
  // unCOMMENT THIS VARIABLE OUT. IF YOU ARE NOT USING PROXY, LEAVE THEM COMMENTED:
  // const WEATHER_URL_HOME = buildUrl('https://reactweatherapp.com', {
  //   path: 'proxy/weatherproxy.php',
  //   queryParams: {
  //     lat: globalStore.latitude,
  //     lon: globalStore.longitude
  //   }
  // });

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
    ? (
      <div>
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
    )
    : <div className="loadingDiv"><Ripple size={154} /></div>
  );
}
