import React, { useContext, useEffect, useState } from 'react';
import { Ripple } from 'react-css-spinners/dist/Ripple';
import { GlobalStoreContext } from './Store';
import axios from 'axios';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';
import '../css/style.scss';

export default function Weather() {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  // IF YOU ARE NOT USING PROXY, UNCOMMENT FOLLOWING LINES:
  const API_KEY_OPENWEATHER = process.env.REACT_APP_API_KEY_OW;
  let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
  WEATHER_URL_HOME += 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&appid=';
  WEATHER_URL_HOME += `${API_KEY_OPENWEATHER}&lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  // IF YOU ARE USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO proxy.php OR
  // COMMENT THIS VARIABLE IF YOU ARE NOT USING PROXY:
  // let WEATHER_URL_HOME = 'https://reactweatherapp.com/proxy/proxy.php';
  // WEATHER_URL_HOME += `?lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  useEffect(() => {
    fetchWeather();
  }, [globalStore.latitude]);

  const fetchWeather = async () => {
    setWeatherLoaded(false);
    try {
      // const res = await axios.get(WEATHER_URL_HOME);
      // setGlobalStore({...globalStore, JSON: res.data, isAppLoaded: true});
      await setGlobalStore({...globalStore, JSON: response});
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

  const response1 = {
    "lat": 54.9,
    "lon": 23.97,
    "timezone": "Europe/Vilnius",
    "timezone_offset": 7200,
    "current": {
      "dt": 1603802354,
      "sunrise": 1603775865,
      "sunset": 1603810677,
      "temp": 286.15,
      "feels_like": 283.68,
      "pressure": 1011,
      "humidity": 82,
      "dew_point": 283.15,
      "uvi": 0.96,
      "clouds": 90,
      "visibility": 10000,
      "wind_speed": 3.6,
      "wind_deg": 160,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ]
    },
    "hourly": [
      {
        "dt": 1603800000,
        "temp": 286.15,
        "feels_like": 282.49,
        "pressure": 1011,
        "humidity": 82,
        "dew_point": 283.15,
        "clouds": 90,
        "visibility": 10000,
        "wind_speed": 5.3,
        "wind_deg": 173,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603803600,
        "temp": 286.04,
        "feels_like": 282.75,
        "pressure": 1011,
        "humidity": 83,
        "dew_point": 283.23,
        "clouds": 95,
        "visibility": 10000,
        "wind_speed": 4.8,
        "wind_deg": 180,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0.35
      },
      {
        "dt": 1603807200,
        "temp": 285.91,
        "feels_like": 282.5,
        "pressure": 1011,
        "humidity": 84,
        "dew_point": 283.28,
        "clouds": 98,
        "visibility": 10000,
        "wind_speed": 4.99,
        "wind_deg": 184,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0.23
      },
      {
        "dt": 1603810800,
        "temp": 285.55,
        "feels_like": 282.27,
        "pressure": 1011,
        "humidity": 86,
        "dew_point": 283.28,
        "clouds": 99,
        "visibility": 10000,
        "wind_speed": 4.8,
        "wind_deg": 178,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.15
      },
      {
        "dt": 1603814400,
        "temp": 285.56,
        "feels_like": 281.99,
        "pressure": 1011,
        "humidity": 86,
        "dew_point": 283.29,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 5.21,
        "wind_deg": 173,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.15
      },
      {
        "dt": 1603818000,
        "temp": 285.58,
        "feels_like": 281.55,
        "pressure": 1012,
        "humidity": 86,
        "dew_point": 283.35,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 5.88,
        "wind_deg": 176,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.16
      },
      {
        "dt": 1603821600,
        "temp": 285,
        "feels_like": 280.8,
        "pressure": 1012,
        "humidity": 88,
        "dew_point": 283.23,
        "clouds": 94,
        "visibility": 10000,
        "wind_speed": 6.03,
        "wind_deg": 181,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.21
      },
      {
        "dt": 1603825200,
        "temp": 285.53,
        "feels_like": 281.76,
        "pressure": 1012,
        "humidity": 86,
        "dew_point": 283.36,
        "clouds": 80,
        "visibility": 10000,
        "wind_speed": 5.49,
        "wind_deg": 195,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.29
      },
      {
        "dt": 1603828800,
        "temp": 284.88,
        "feels_like": 281.6,
        "pressure": 1012,
        "humidity": 90,
        "dew_point": 283.42,
        "clouds": 70,
        "visibility": 10000,
        "wind_speed": 4.81,
        "wind_deg": 204,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
          }
        ],
        "pop": 0.37,
        "rain": {
          "1h": 0.15
        }
      },
      {
        "dt": 1603832400,
        "temp": 285.06,
        "feels_like": 282.37,
        "pressure": 1012,
        "humidity": 91,
        "dew_point": 283.73,
        "clouds": 80,
        "visibility": 10000,
        "wind_speed": 4.1,
        "wind_deg": 211,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
          }
        ],
        "pop": 0.67,
        "rain": {
          "1h": 0.14
        }
      },
      {
        "dt": 1603836000,
        "temp": 284.87,
        "feels_like": 282.39,
        "pressure": 1013,
        "humidity": 94,
        "dew_point": 284,
        "clouds": 85,
        "visibility": 10000,
        "wind_speed": 3.92,
        "wind_deg": 220,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10n"
          }
        ],
        "pop": 0.89,
        "rain": {
          "1h": 1.05
        }
      },
      {
        "dt": 1603839600,
        "temp": 284.58,
        "feels_like": 282.81,
        "pressure": 1013,
        "humidity": 95,
        "dew_point": 283.86,
        "clouds": 88,
        "visibility": 10000,
        "wind_speed": 2.85,
        "wind_deg": 220,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
          }
        ],
        "pop": 0.93,
        "rain": {
          "1h": 0.43
        }
      },
      {
        "dt": 1603843200,
        "temp": 284.02,
        "feels_like": 280.8,
        "pressure": 1014,
        "humidity": 92,
        "dew_point": 282.87,
        "clouds": 90,
        "visibility": 10000,
        "wind_speed": 4.52,
        "wind_deg": 272,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10n"
          }
        ],
        "pop": 0.86,
        "rain": {
          "1h": 1.17
        }
      },
      {
        "dt": 1603846800,
        "temp": 282.96,
        "feels_like": 280.78,
        "pressure": 1014,
        "humidity": 92,
        "dew_point": 281.78,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.65,
        "wind_deg": 285,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
          }
        ],
        "pop": 0.82,
        "rain": {
          "1h": 0.99
        }
      },
      {
        "dt": 1603850400,
        "temp": 282.65,
        "feels_like": 281.4,
        "pressure": 1014,
        "humidity": 94,
        "dew_point": 281.83,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 1.33,
        "wind_deg": 198,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10n"
          }
        ],
        "pop": 0.86,
        "rain": {
          "1h": 1.18
        }
      },
      {
        "dt": 1603854000,
        "temp": 282.69,
        "feels_like": 280.98,
        "pressure": 1014,
        "humidity": 94,
        "dew_point": 281.82,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 1.99,
        "wind_deg": 216,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
          }
        ],
        "pop": 0.92,
        "rain": {
          "1h": 0.34
        }
      },
      {
        "dt": 1603857600,
        "temp": 282.13,
        "feels_like": 280.35,
        "pressure": 1014,
        "humidity": 95,
        "dew_point": 281.39,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 1.95,
        "wind_deg": 201,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.75
      },
      {
        "dt": 1603861200,
        "temp": 281.78,
        "feels_like": 279.73,
        "pressure": 1014,
        "humidity": 95,
        "dew_point": 281.05,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.22,
        "wind_deg": 192,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0.72
      },
      {
        "dt": 1603864800,
        "temp": 281.72,
        "feels_like": 279.52,
        "pressure": 1015,
        "humidity": 95,
        "dew_point": 281.09,
        "clouds": 99,
        "visibility": 10000,
        "wind_speed": 2.41,
        "wind_deg": 191,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0.72
      },
      {
        "dt": 1603868400,
        "temp": 282.7,
        "feels_like": 280.54,
        "pressure": 1015,
        "humidity": 92,
        "dew_point": 281.5,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.53,
        "wind_deg": 193,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603872000,
        "temp": 283.81,
        "feels_like": 281.56,
        "pressure": 1016,
        "humidity": 86,
        "dew_point": 281.64,
        "clouds": 99,
        "visibility": 10000,
        "wind_speed": 2.7,
        "wind_deg": 191,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603875600,
        "temp": 285.03,
        "feels_like": 282.5,
        "pressure": 1016,
        "humidity": 78,
        "dew_point": 281.48,
        "clouds": 87,
        "visibility": 10000,
        "wind_speed": 3.01,
        "wind_deg": 185,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603879200,
        "temp": 285.96,
        "feels_like": 283.26,
        "pressure": 1015,
        "humidity": 73,
        "dew_point": 281.25,
        "clouds": 82,
        "visibility": 10000,
        "wind_speed": 3.23,
        "wind_deg": 184,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603882800,
        "temp": 286.59,
        "feels_like": 283.79,
        "pressure": 1015,
        "humidity": 70,
        "dew_point": 281.4,
        "clouds": 66,
        "visibility": 10000,
        "wind_speed": 3.36,
        "wind_deg": 183,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603886400,
        "temp": 286.94,
        "feels_like": 284.21,
        "pressure": 1015,
        "humidity": 72,
        "dew_point": 282.12,
        "clouds": 56,
        "visibility": 10000,
        "wind_speed": 3.53,
        "wind_deg": 186,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603890000,
        "temp": 286.89,
        "feels_like": 284.21,
        "pressure": 1014,
        "humidity": 77,
        "dew_point": 282.96,
        "clouds": 29,
        "visibility": 10000,
        "wind_speed": 3.81,
        "wind_deg": 190,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603893600,
        "temp": 286.4,
        "feels_like": 283.97,
        "pressure": 1014,
        "humidity": 81,
        "dew_point": 283.33,
        "clouds": 50,
        "visibility": 10000,
        "wind_speed": 3.56,
        "wind_deg": 191,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603897200,
        "temp": 285.96,
        "feels_like": 283.29,
        "pressure": 1014,
        "humidity": 83,
        "dew_point": 283.18,
        "clouds": 65,
        "visibility": 10000,
        "wind_speed": 3.88,
        "wind_deg": 188,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603900800,
        "temp": 285.67,
        "feels_like": 283,
        "pressure": 1014,
        "humidity": 84,
        "dew_point": 283.16,
        "clouds": 72,
        "visibility": 10000,
        "wind_speed": 3.83,
        "wind_deg": 188,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603904400,
        "temp": 285.48,
        "feels_like": 282.89,
        "pressure": 1014,
        "humidity": 86,
        "dew_point": 283.23,
        "clouds": 76,
        "visibility": 10000,
        "wind_speed": 3.79,
        "wind_deg": 186,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603908000,
        "temp": 284.95,
        "feels_like": 282.15,
        "pressure": 1014,
        "humidity": 88,
        "dew_point": 283.16,
        "clouds": 77,
        "visibility": 10000,
        "wind_speed": 4.02,
        "wind_deg": 181,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603911600,
        "temp": 283.9,
        "feels_like": 281.11,
        "pressure": 1014,
        "humidity": 93,
        "dew_point": 282.82,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.92,
        "wind_deg": 187,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603915200,
        "temp": 283.63,
        "feels_like": 280.72,
        "pressure": 1014,
        "humidity": 93,
        "dew_point": 282.68,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.99,
        "wind_deg": 195,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603918800,
        "temp": 283.42,
        "feels_like": 280.57,
        "pressure": 1014,
        "humidity": 93,
        "dew_point": 282.41,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.83,
        "wind_deg": 193,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603922400,
        "temp": 283.26,
        "feels_like": 280.36,
        "pressure": 1014,
        "humidity": 93,
        "dew_point": 282.26,
        "clouds": 1,
        "visibility": 10000,
        "wind_speed": 3.85,
        "wind_deg": 195,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603926000,
        "temp": 283.14,
        "feels_like": 280.09,
        "pressure": 1014,
        "humidity": 93,
        "dew_point": 282.11,
        "clouds": 10,
        "visibility": 10000,
        "wind_speed": 4.02,
        "wind_deg": 192,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603929600,
        "temp": 282.97,
        "feels_like": 279.99,
        "pressure": 1014,
        "humidity": 92,
        "dew_point": 281.8,
        "clouds": 21,
        "visibility": 10000,
        "wind_speed": 3.8,
        "wind_deg": 190,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603933200,
        "temp": 283.53,
        "feels_like": 280.4,
        "pressure": 1014,
        "humidity": 87,
        "dew_point": 281.62,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.92,
        "wind_deg": 205,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603936800,
        "temp": 283.51,
        "feels_like": 280.58,
        "pressure": 1013,
        "humidity": 85,
        "dew_point": 281.26,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.5,
        "wind_deg": 205,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603940400,
        "temp": 283.08,
        "feels_like": 280.42,
        "pressure": 1013,
        "humidity": 86,
        "dew_point": 280.93,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.03,
        "wind_deg": 206,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603944000,
        "temp": 282.81,
        "feels_like": 280.28,
        "pressure": 1013,
        "humidity": 86,
        "dew_point": 280.72,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.76,
        "wind_deg": 203,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603947600,
        "temp": 282.71,
        "feels_like": 280.11,
        "pressure": 1013,
        "humidity": 86,
        "dew_point": 280.53,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.83,
        "wind_deg": 204,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603951200,
        "temp": 281.94,
        "feels_like": 279.09,
        "pressure": 1014,
        "humidity": 87,
        "dew_point": 280.06,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.99,
        "wind_deg": 213,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603954800,
        "temp": 282.73,
        "feels_like": 279.76,
        "pressure": 1014,
        "humidity": 83,
        "dew_point": 280.11,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.19,
        "wind_deg": 207,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603958400,
        "temp": 283.1,
        "feels_like": 279.89,
        "pressure": 1014,
        "humidity": 82,
        "dew_point": 280.19,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.59,
        "wind_deg": 214,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603962000,
        "temp": 283.68,
        "feels_like": 280.7,
        "pressure": 1013,
        "humidity": 80,
        "dew_point": 280.44,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.33,
        "wind_deg": 206,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603965600,
        "temp": 284.78,
        "feels_like": 281.57,
        "pressure": 1013,
        "humidity": 76,
        "dew_point": 280.77,
        "clouds": 99,
        "visibility": 10000,
        "wind_speed": 3.76,
        "wind_deg": 209,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1603969200,
        "temp": 285.61,
        "feels_like": 282.13,
        "pressure": 1013,
        "humidity": 72,
        "dew_point": 280.79,
        "clouds": 91,
        "visibility": 10000,
        "wind_speed": 4.16,
        "wind_deg": 216,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "pop": 0
      }
    ],
    "daily": [
      {
        "dt": 1603792800,
        "sunrise": 1603775865,
        "sunset": 1603810677,
        "temp": {
          "day": 284.7,
          "min": 283.31,
          "max": 286.15,
          "night": 285.13,
          "eve": 285.84,
          "morn": 283.31
        },
        "feels_like": {
          "day": 280.59,
          "night": 282.46,
          "eve": 282.54,
          "morn": 278.61
        },
        "pressure": 1011,
        "humidity": 88,
        "dew_point": 282.87,
        "wind_speed": 5.8,
        "wind_deg": 174,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 100,
        "pop": 0.67,
        "rain": 0.41,
        "uvi": 0.96
      },
      {
        "dt": 1603879200,
        "sunrise": 1603862387,
        "sunset": 1603896946,
        "temp": {
          "day": 285.03,
          "min": 281.72,
          "max": 286.94,
          "night": 283.42,
          "eve": 285.96,
          "morn": 282.69
        },
        "feels_like": {
          "day": 282.5,
          "night": 280.57,
          "eve": 283.29,
          "morn": 280.98
        },
        "pressure": 1016,
        "humidity": 78,
        "dew_point": 281.48,
        "wind_speed": 3.01,
        "wind_deg": 185,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "clouds": 87,
        "pop": 0.92,
        "rain": 5.16,
        "uvi": 0.95
      },
      {
        "dt": 1603965600,
        "sunrise": 1603948909,
        "sunset": 1603983217,
        "temp": {
          "day": 283.68,
          "min": 281.94,
          "max": 285.99,
          "night": 282.64,
          "eve": 283.05,
          "morn": 283.08
        },
        "feels_like": {
          "day": 280.7,
          "night": 279.72,
          "eve": 280.13,
          "morn": 280.42
        },
        "pressure": 1013,
        "humidity": 80,
        "dew_point": 280.44,
        "wind_speed": 3.33,
        "wind_deg": 206,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 100,
        "pop": 0.27,
        "rain": 0.25,
        "uvi": 0.78
      },
      {
        "dt": 1604052000,
        "sunrise": 1604035432,
        "sunset": 1604069490,
        "temp": {
          "day": 282.54,
          "min": 279.14,
          "max": 283.86,
          "night": 279.14,
          "eve": 281.79,
          "morn": 281.74
        },
        "feels_like": {
          "day": 278.32,
          "night": 275.99,
          "eve": 278.18,
          "morn": 278.2
        },
        "pressure": 1016,
        "humidity": 82,
        "dew_point": 279.79,
        "wind_speed": 4.86,
        "wind_deg": 265,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 77,
        "pop": 0.81,
        "rain": 1.38,
        "uvi": 0.8
      },
      {
        "dt": 1604138400,
        "sunrise": 1604121954,
        "sunset": 1604155764,
        "temp": {
          "day": 280.53,
          "min": 277.38,
          "max": 281.88,
          "night": 278.55,
          "eve": 280.78,
          "morn": 277.77
        },
        "feels_like": {
          "day": 278.1,
          "night": 276.05,
          "eve": 278.83,
          "morn": 274.8
        },
        "pressure": 1025,
        "humidity": 85,
        "dew_point": 278.21,
        "wind_speed": 1.87,
        "wind_deg": 354,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "clouds": 67,
        "pop": 0,
        "uvi": 0.8
      },
      {
        "dt": 1604224800,
        "sunrise": 1604208477,
        "sunset": 1604242039,
        "temp": {
          "day": 280.78,
          "min": 276.85,
          "max": 282.83,
          "night": 278.3,
          "eve": 280.17,
          "morn": 277.09
        },
        "feels_like": {
          "day": 277.56,
          "night": 274.61,
          "eve": 276.99,
          "morn": 274.17
        },
        "pressure": 1029,
        "humidity": 78,
        "dew_point": 277.25,
        "wind_speed": 2.72,
        "wind_deg": 195,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": 0,
        "pop": 0,
        "uvi": 0.81
      },
      {
        "dt": 1604311200,
        "sunrise": 1604295000,
        "sunset": 1604328316,
        "temp": {
          "day": 281.17,
          "min": 277.03,
          "max": 283.24,
          "night": 278.8,
          "eve": 280.11,
          "morn": 277.46
        },
        "feels_like": {
          "day": 276.09,
          "night": 275.1,
          "eve": 276.83,
          "morn": 273.61
        },
        "pressure": 1029,
        "humidity": 75,
        "dew_point": 277.03,
        "wind_speed": 5.33,
        "wind_deg": 170,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": 0,
        "pop": 0,
        "uvi": 0.77
      },
      {
        "dt": 1604397600,
        "sunrise": 1604381522,
        "sunset": 1604414595,
        "temp": {
          "day": 282.59,
          "min": 277.54,
          "max": 285.09,
          "night": 279.9,
          "eve": 282.09,
          "morn": 277.54
        },
        "feels_like": {
          "day": 279,
          "night": 276.98,
          "eve": 279.03,
          "morn": 274.89
        },
        "pressure": 1030,
        "humidity": 76,
        "dew_point": 278.65,
        "wind_speed": 3.64,
        "wind_deg": 86,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": 0,
        "pop": 0,
        "uvi": 0.68
      }
    ]
  };

  return (
    weatherLoaded
    ? <div>
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
    : <div className="loadingDiv"><Ripple size={154} /></div>
  );
}
