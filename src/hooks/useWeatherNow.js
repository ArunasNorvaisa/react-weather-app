import { useContext } from "react";
import { getDate, getIcon, KtoC, KtoF } from "../functions/functions";
import { GlobalStoreContext } from "../components/Store";

export default function useWeatherNow() {
  const [globalStore] = useContext(GlobalStoreContext);
  const icon = getIcon(`${globalStore.JSON.current.weather[0].icon}`);

  let temperatureNow, temperatureMin, temperatureMax;

  if (globalStore.tInC) {
    temperatureNow = KtoC(globalStore.JSON.current.temp).toFixed(0);
    temperatureMin = KtoC(globalStore.JSON.daily[0].temp.min).toFixed(0);
    temperatureMax = KtoC(globalStore.JSON.daily[0].temp.max).toFixed(0);
  } else {
    temperatureNow = KtoF(globalStore.JSON.current.temp).toFixed(0);
    temperatureMin = KtoF(globalStore.JSON.daily[0].temp.min).toFixed(0);
    temperatureMax = KtoF(globalStore.JSON.daily[0].temp.max).toFixed(0);
  }

  const getPrecipitation = () => {
    const todayWeather = globalStore.JSON.daily[0];
    const weatherTypes = ["rain", "snow"];
    const prepType = weatherTypes.find((type) => type in todayWeather) || "";

    return `${prepType} ${(todayWeather.pop * 100).toFixed(0)}%`;
  };

  const timeOptions = {
    timeZone: globalStore.JSON.timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return {
    icon,
    icon_URL: `/images/icons/${icon}.svg`,
    sunrise: globalStore.JSON.current.sunrise,
    sunset: globalStore.JSON.current.sunset,
    temperatureMax,
    temperatureMin,
    temperatureNow,
    timeNow: new Date(globalStore.JSON.current.dt).getTime(),
    timeOptions,
    timezone: globalStore.JSON.timezone,
    tInC: globalStore.tInC,
    weatherDescription: globalStore.JSON.current.weather[0].description,
    weatherMain: globalStore.JSON.current.weather[0].main,
    getDate,
    getPrecipitation,
  };
}
