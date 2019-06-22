import React, { useContext } from 'react';
import SunCycle from './SunCycle';
import { CtoF, getDate } from "../functions/functions";
import { GlobalStoreContext } from "./Store";

function WeatherNow() {
  const [globalStore] = useContext(GlobalStoreContext);
  const icon_URL = "./images/icons/" + globalStore.JSON.currently.icon + ".svg";
  const timeNow = Math.round(new Date().getTime()/1000);
  let temperatureNow,
      temperatureMin,
      temperatureMax;

  if(globalStore.tInC) {
    temperatureNow = globalStore.JSON.currently.temperature.toFixed(0);
    temperatureMin = globalStore.JSON.daily.data[0].temperatureLow.toFixed(0);
    temperatureMax = globalStore.JSON.daily.data[0].temperatureHigh.toFixed(0);
  } else {
    temperatureNow = CtoF(globalStore.JSON.currently.temperature).toFixed(0);
    temperatureMin = CtoF(globalStore.JSON.daily.data[0].temperatureLow).toFixed(0);
    temperatureMax = CtoF(globalStore.JSON.daily.data[0].temperatureHigh).toFixed(0);
  }

  // We'll show precipitation if it's expected only; see final return statement
  const getPrecipitation = () => {
    if(globalStore.JSON.currently.precipType) {
      return (
        <div>
          {globalStore.JSON.currently.precipType}&nbsp;
          {(globalStore.JSON.currently.precipProbability * 100).toFixed(0)}%
        </div>
      );
    }
  };

  const timeOptions = {
    timeZone: globalStore.JSON.timezone,
    weekday : 'short',
    month   : 'short',
    day     : 'numeric',
    hour    : '2-digit',
    minute  : '2-digit',
    hour12  : true
  };

  return (
    <div className="todayWeather">
      <SunCycle
        sunrise={globalStore.JSON.daily.data[0].sunriseTime}
        sunset={globalStore.JSON.daily.data[0].sunsetTime}
        timezone={globalStore.JSON.timezone}
      />
      <div className="tToday">{temperatureMin} / {temperatureMax}&deg;{globalStore.tInC ? "C" : "F"}</div>
      <div>{globalStore.JSON.currently.summary}</div>
      <div className="tNow">{temperatureNow}&deg;{globalStore.tInC ? "C" : "F"}
        <img src={icon_URL} alt={globalStore.JSON.currently.icon} />
      </div>
      {getPrecipitation()} {/* showing precipitation only if it's expected */}
      <div className="timeNow">{getDate(timeNow, timeOptions)}</div>
      <hr />
      <div>{globalStore.JSON.hourly.summary}</div>
    </div>
  );
}

export default WeatherNow;
