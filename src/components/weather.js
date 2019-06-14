import React, { useState, useEffect } from 'react';
import WeatherByTheHour from './weatherbythehour';
import WeatherNow from './weathernow';
import { getDate, CtoF } from '../functions/functions';

export default function Weather(props) {

  // Uncomment this constant if you will not use local proxy as explained below
  const API_KEY_DARKSKY = `${ process.env.REACT_APP_API_KEY_DS }`;

  // Change the below URL to reflect your path to proxy.php
  // OR, in non-production environment you may use the commented-out shortcut below
  // let WEATHER_URL_HOME = 'https://reactweatherapp.com/proxy/proxy.php';
  // WEATHER_URL_HOME += `?lat=${ props.latitude }&lon=${ props.longitude }`;

  // If you aren't ready to mess up with local proxy stuff, here goes the shortcut.
  // Just change above WEATHER_URL_HOME with code below (and uncomment constant
  // API_KEY_DARKSKY above):

  let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
  WEATHER_URL_HOME += `https://api.forecast.io/forecast/${ API_KEY_DARKSKY }/`;
  WEATHER_URL_HOME += `${ props.latitude },${ props.longitude }`;
  WEATHER_URL_HOME += '?units=si&exclude=flags%2Cminutely';

  const [isTemperatureInC, setIsTemperatureInC] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [JSON, setJSON] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      setIsLoaded(false);

      const response = await fetch(WEATHER_URL_HOME, { method: 'GET' });
      const json = await response.json();
      setJSON(json);
      setIsLoaded(true);
    }
    fetchWeather();
  }, [JSON, WEATHER_URL_HOME]);

  const getForecast = date => {
    let {icon, time, temperatureLow, temperatureHigh, summary} = JSON.daily.data[date];
    const icon_URL = "./images/icons/" + icon + ".svg";
    // Calculating temperature in Fahrenheit
    if (!isTemperatureInC) {
      temperatureLow = CtoF(temperatureLow);
      temperatureHigh = CtoF(temperatureHigh);
    }

    return <div>
      <div className="icon">
        <img src={ icon_URL } alt="icon"/>
      </div>
      <div className="date">
        {getDate(time, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: JSON.timezone
          }
        )}
      </div>
      <div className="tToday">
        { temperatureLow.toFixed(0) }&deg;
        /&nbsp;
        { temperatureHigh.toFixed(0) }&deg;
        { isTemperatureInC ? "C" : "F" }
      </div>
      <div className="forecastSummary">{ summary }</div>
      <hr/>
    </div>;
  };

  const handleTemperatureUnitChange = event => {
    event.preventDefault();
    setIsTemperatureInC(!isTemperatureInC);
  };

  return isLoaded ?
    <div>
      <WeatherByTheHour JSON={ JSON } isTemperatureInC={ isTemperatureInC }/>
      <div className="renderedWeather">
        <button className="cOrF" onClick={ handleTemperatureUnitChange }>
          Switch to &deg;{ isTemperatureInC ? "F" : "C" }
        </button>
        <div className="leftPanel">
          <div className="cityName">{ props.city }</div>
          <WeatherNow
            JSON={ JSON }
            isTemperatureInC={ isTemperatureInC }
          />
        </div>
        <div className="rightPanel">
          <div className="dailyWeather">{ getForecast(1) }</div>
          <div className="dailyWeather">{ getForecast(2) }</div>
          <div className="dailyWeather">{ getForecast(3) }</div>
          <div className="poweredBy">Powered by <a href="http://darksky.net/poweredby/">Dark
            Sky</a></div>
        </div>
      </div>
    </div> :
    <h3>Loading weather, please wait...</h3>;
}
