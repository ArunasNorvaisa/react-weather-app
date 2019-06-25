import React, { useEffect, useContext } from 'react';
import { GlobalStoreContext } from './Store';
import axios from 'axios';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';
import { getDate, CtoF } from '../functions/functions';

export default function Weather() {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);

  // Uncomment this constant if you will not use local proxy as explained below
  // const API_KEY_DARKSKY = `${process.env.REACT_APP_API_KEY_DS}`;

  // Change the below URL to reflect your path to proxy.php
  // OR, in non-production environment you may use the commented-out shortcut below
  let WEATHER_URL_HOME = 'https://reactweatherapp.com/proxy/proxy.php';
  WEATHER_URL_HOME += `?lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  // If you aren't ready to mess up with local proxy stuff, here goes the shortcut.
  // Just change above WEATHER_URL_HOME with code below (and uncomment constant
  // API_KEY_DARKSKY above):
  // let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
  // WEATHER_URL_HOME += `https://api.forecast.io/forecast/${API_KEY_DARKSKY}/`;
  // WEATHER_URL_HOME += `${globalStore.latitude},${globalStore.longitude}`;
  // WEATHER_URL_HOME += '?units=si&exclude=flags%2Cminutely';

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, [globalStore.city]);

  const fetchWeather = async () => {
    setGlobalStore({...globalStore, isWeatherLoaded: false});
    const res = await axios.get(WEATHER_URL_HOME);
    setGlobalStore({...globalStore, JSON: {...res.data}, isWeatherLoaded: true});
  };

  const getForecast = date => {
    let { icon, time, temperatureLow, temperatureHigh, summary } = globalStore.JSON.daily.data[date];
    const icon_URL = `./images/icons/${icon}.svg`;
    // Calculating temperature in Fahrenheit
    if (!globalStore.tInC) {
      temperatureLow = CtoF(temperatureLow);
      temperatureHigh = CtoF(temperatureHigh);
    }

    return (
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
    );
  };

  const handleTemperatureUnitChange = event => {
    event.preventDefault();
    setGlobalStore({...globalStore, tInC: !globalStore.tInC});
  };

  return (
    globalStore.isWeatherLoaded ?
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
            <div className='dailyWeather'>{getForecast(1)}</div>
            <div className='dailyWeather'>{getForecast(2)}</div>
            <div className='dailyWeather'>{getForecast(3)}</div>
            <div className='poweredBy'>Powered by <a href='http://darksky.net/poweredby/'>Dark
              Sky</a></div>
          </div>
        </div>
      </div> :
    <h3>Loading weather, please wait...</h3>
  );
}
