import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from './Store';
import axios from 'axios';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';

export default function Weather() {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  // IF YOU ARE NOT USING PROXY, UNCOMMENT FOLLOWING LINES:
  // const API_KEY_DARKSKY = `${process.env.REACT_APP_API_KEY_DS}`;
  // let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
  // WEATHER_URL_HOME += `https://api.forecast.io/forecast/${API_KEY_DARKSKY}/`;
  // WEATHER_URL_HOME += `${globalStore.latitude},${globalStore.longitude}`;
  // WEATHER_URL_HOME += '?units=si&exclude=flags%2Cminutely';

  // IF YOU ARE USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO proxy.php OR
  // COMMENT THIS VARIABLE IF YOU ARE NOT USING PROXY:
  let WEATHER_URL_HOME = 'https://reactweatherapp.com/proxy/proxy.php';
  WEATHER_URL_HOME += `?lat=${globalStore.latitude}&lon=${globalStore.longitude}`;


  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, [globalStore.latitude]);

  const fetchWeather = async () => {
    setWeatherLoaded(false);
    const res = await axios.get(WEATHER_URL_HOME);
    setGlobalStore({...globalStore, JSON: res.data});
    setWeatherLoaded(true);
  };

  const handleTemperatureUnitChange = event => {
    event.preventDefault();
    setGlobalStore({...globalStore, tInC: !globalStore.tInC});
  };

  return (
    weatherLoaded ?
      <div>
        <WeatherByTheHour />
        <div className='renderedWeather'>
          <button className='cOrF' onClick={handleTemperatureUnitChange}>
            Switch to &deg;{globalStore.tInC ? 'F' : 'C'}
          </button>
          <div className='leftPanel'>
            <div className='cityName'>{globalStore.city}</div>
            <WeatherNow />
          </div>
          <div className='rightPanel'>
            <DailyWeather date={1} />
            <DailyWeather date={2} />
            <DailyWeather date={3} />
            <div className='poweredBy'>Powered by <a href='http://darksky.net/poweredby/'>Dark
              Sky</a></div>
          </div>
        </div>
      </div> :
    <h3>Loading weather, please wait...</h3>
  );
}
