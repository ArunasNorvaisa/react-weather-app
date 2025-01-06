import { useContext } from "react";
import { getIcon, getTime, KtoC, KtoF } from "../functions/functions";
import { GlobalStoreContext } from "../components/Store.jsx";

export default function useHourlyWeatherItem({
  item,
  isTemperatureInC,
  timezone,
}) {
  const [globalStore] = useContext(GlobalStoreContext);
  const icon = getIcon(`${item.weather[0].icon}`);
  const icon_URL = `/images/icons/${icon}.svg`;
  const temperature = isTemperatureInC
    ? KtoC(item.temp).toFixed(0)
    : KtoF(item.temp).toFixed(0);

  const timeOptions = {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const prepType = () => {
    const weatherTypes = ["rain", "snow"];
    const prepType = weatherTypes.find((type) => type in item);
    return prepType ? `${prepType} ` : "";
  };

  return {
    icon,
    icon_URL,
    temperature,
    timeOptions,
    getTime,
    prepType,
  };
}
