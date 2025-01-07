import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../components/Store.jsx';
import buildUrl from 'build-url';
import axios from 'axios';

export default function useWeather() {
  const { globalState, setGlobalState, setError } = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  // IF YOU ARE USING PROXY, COMMENT THE FOLLOWING 2 VARIABLES OUT:
  const API_KEY_OPENWEATHER = import.meta.env.VITE_API_KEY_OW;
  const url = buildUrl('https://cors-anywhere.herokuapp.com/', {
    path: 'https://api.openweathermap.org/data/2.5/onecall',
    queryParams: {
      exclude: 'minutely',
      appid: API_KEY_OPENWEATHER,
      lat: globalState.latitude,
      lon: globalState.longitude
    }
  });

  // IF YOU ARE USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO weatherproxy.php AND
  // unCOMMENT THIS VARIABLE OUT. IF YOU ARE NOT USING PROXY, LEAVE THEM COMMENTED:
  // const url = buildUrl('https://YOUR_DOMAIN.com', {
  //   path: '/proxy/weatherproxy.php',
  //   queryParams: {
  //     lat: globalState.latitude,
  //     lon: globalState.longitude
  //   }
  // });

  useEffect(() => {
    fetchWeather();
  }, [globalState.latitude]);

  const fetchWeather = async () => {
    setWeatherLoaded(false);
    try {
      const res = await axios.get(url);
      setGlobalState((prevState) => ({ ...prevState, jsonData: res.data, isAppLoaded: true }));
    } catch (error) {
      console.error(`ERROR(${error.code}): ${error.message}`);
      setError(error);
    } finally {
      setWeatherLoaded(true);
    }
  };

  const handleTemperatureUnitChange = (event) => {
    event.preventDefault();
    setGlobalState((prevState) => ({ ...prevState, tInC: !prevState.tInC }));
  };

  return {
    city: globalState.city,
    hourlyWeatherItems: globalState.jsonData.hourly,
    weatherLoaded,
    tInC: globalState.tInC,
    timezone: globalState.jsonData.timezone,
    handleTemperatureUnitChange
  };
}
