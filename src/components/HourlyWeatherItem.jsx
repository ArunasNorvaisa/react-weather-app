import React, { useContext } from 'react';
import { CtoF, getTime } from "../functions/functions";
import { GlobalStoreContext } from "./Store";

const HourlyWeatherItem = props => {
  const [globalStore] = useContext(GlobalStoreContext);
  const icon_URL = "./images/icons/" + props.item.icon + ".svg";
  let temperature;

  globalStore.tInC ?
    temperature = props.item.temperature.toFixed(0) :
    temperature = CtoF(props.item.temperature).toFixed(0);

  const timeOptions = {
    timeZone: globalStore.JSON.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  return (
    <div className="hourlyWeatherItem">
      <div>{getTime(props.item.time, timeOptions)}</div>
      <div><img src={icon_URL} alt={props.item.icon} /></div>
      <div>{temperature}&deg;{globalStore.tInC ? "C" : "F"}</div>
      {props.item.precipType &&
        <div>
          {props.item.precipType} {(props.item.precipProbability * 100).toFixed(0)}%
        </div>
      }
    </div>
  );
};

export default HourlyWeatherItem;
