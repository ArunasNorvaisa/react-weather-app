import React, { useContext } from 'react';
import SunCycle from './SunCycle';
import { KtoC, KtoF, getDate, getIcon } from '../functions/functions';
import { GlobalStoreContext } from './Store';
import '../css/style.scss';

export default function WeatherNow() {

  const [globalStore] = useContext(GlobalStoreContext);
  const icon = getIcon(`${globalStore.JSON.current.weather[0].icon}`);
  const icon_URL = `./images/icons/${icon}.svg`;
  const timeNow = new Date(globalStore.JSON.current.dt).getTime();

  let temperatureNow,
      temperatureMin,
      temperatureMax;

  if(globalStore.tInC) {
    temperatureNow = KtoC(globalStore.JSON.current.temp).toFixed(0);
    temperatureMin = KtoC(globalStore.JSON.daily[0].temp.min).toFixed(0);
    temperatureMax = KtoC(globalStore.JSON.daily[0].temp.max).toFixed(0);
  } else {
    temperatureNow = KtoF(globalStore.JSON.current.temp).toFixed(0);
    temperatureMin = KtoF(globalStore.JSON.daily[0].temp.min).toFixed(0);
    temperatureMax = KtoF(globalStore.JSON.daily[0].temp.max).toFixed(0);
  }

  const getPrecipitation = () => {

    const prepType = () => {
      if ('rain' in globalStore.JSON.daily[0]) return 'rain ';
      else if ('snow' in globalStore.JSON.daily[0]) return 'snow ';
      return '';
    };

    return (
      <div>
        {prepType()}
        {(globalStore.JSON.daily[0].pop * 100).toFixed(0)}
        %
      </div>
    );
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
        sunrise={globalStore.JSON.current.sunrise}
        sunset={globalStore.JSON.current.sunset}
        timezone={globalStore.JSON.timezone}
      />
      <div>{temperatureMin} / {temperatureMax}&deg;{globalStore.tInC ? 'C' : 'F'}</div>
      <div>{globalStore.JSON.current.weather[0].main}</div>
      <div className="tNow">{temperatureNow}&deg;{globalStore.tInC ? 'C' : 'F'}
        <img src={icon_URL} alt={globalStore.JSON.current.icon} />
      </div>
      {getPrecipitation()} {/* showing precipitation only if it's expected */}
      <div className="timeNow">{getDate(timeNow, timeOptions)}</div>
      <hr />
      <div>{globalStore.JSON.current.weather[0].description}</div>
    </div>
  );
}
