import React, { useContext, useEffect, useState } from 'react';
import { Ripple } from 'react-css-spinners/dist/Ripple';
import { GlobalStoreContext } from './Store';
import axios from 'axios';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';

export default function Weather() {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  // IF YOU ARE NOT USING PROXY, UNCOMMENT FOLLOWING LINES:
  const API_KEY_OPENWEATHER = process.env.API_KEY_OW;
  let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
  WEATHER_URL_HOME += 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&appid=';
  WEATHER_URL_HOME += `${API_KEY_OPENWEATHER}&lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  // IF YOU ARE USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO weatherproxy.php OR
  // COMMENT THIS VARIABLE OUT IF YOU ARE NOT USING PROXY:
  // let WEATHER_URL_HOME = 'https://reactweatherapp.com/proxy1/weatherproxy.php';
  // WEATHER_URL_HOME += `?lat=${globalStore.latitude}&lon=${globalStore.longitude}`;

  useEffect(() => {
    fetchWeather();
  }, [globalStore.latitude]);

  const rezultatas = {
    "lat": 54.89,
    "lon": 23.88,
    "timezone": "Europe/Vilnius",
    "timezone_offset": 7200,
    "current": {
      "dt": 1604760619,
      "sunrise": 1604727632,
      "sunset": 1604759751,
      "temp": 282.15,
      "feels_like": 278.1,
      "pressure": 1027,
      "humidity": 93,
      "dew_point": 281.08,
      "uvi": 0.81,
      "clouds": 90,
      "visibility": 4400,
      "wind_speed": 5.1,
      "wind_deg": 250,
      "weather": [
        {
          "id": 701,
          "main": "Mist",
          "description": "mist",
          "icon": "50n"
        }
      ]
    },
    "hourly": [
      {
        "dt": 1604757600,
        "temp": 282.15,
        "feels_like": 278.8,
        "pressure": 1027,
        "humidity": 93,
        "dew_point": 281.08,
        "clouds": 90,
        "visibility": 10000,
        "wind_speed": 4.1,
        "wind_deg": 252,
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
        "dt": 1604761200,
        "temp": 282.82,
        "feels_like": 279.77,
        "pressure": 1027,
        "humidity": 90,
        "dew_point": 281.26,
        "clouds": 92,
        "visibility": 10000,
        "wind_speed": 3.73,
        "wind_deg": 242,
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
        "dt": 1604764800,
        "temp": 282.62,
        "feels_like": 279.37,
        "pressure": 1026,
        "humidity": 90,
        "dew_point": 281.06,
        "clouds": 89,
        "visibility": 10000,
        "wind_speed": 3.95,
        "wind_deg": 236,
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
        "dt": 1604768400,
        "temp": 282.44,
        "feels_like": 278.62,
        "pressure": 1026,
        "humidity": 90,
        "dew_point": 280.89,
        "clouds": 88,
        "visibility": 10000,
        "wind_speed": 4.7,
        "wind_deg": 239,
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
        "dt": 1604772000,
        "temp": 282.41,
        "feels_like": 278.53,
        "pressure": 1026,
        "humidity": 90,
        "dew_point": 280.86,
        "clouds": 90,
        "visibility": 10000,
        "wind_speed": 4.78,
        "wind_deg": 239,
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
        "dt": 1604775600,
        "temp": 282.5,
        "feels_like": 278.66,
        "pressure": 1025,
        "humidity": 90,
        "dew_point": 280.99,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.75,
        "wind_deg": 242,
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
        "dt": 1604779200,
        "temp": 282.75,
        "feels_like": 278.94,
        "pressure": 1025,
        "humidity": 88,
        "dew_point": 280.99,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.68,
        "wind_deg": 247,
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
        "dt": 1604782800,
        "temp": 282.84,
        "feels_like": 279.21,
        "pressure": 1024,
        "humidity": 87,
        "dew_point": 280.9,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.39,
        "wind_deg": 244,
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
        "dt": 1604786400,
        "temp": 282.88,
        "feels_like": 279.1,
        "pressure": 1024,
        "humidity": 87,
        "dew_point": 280.85,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.62,
        "wind_deg": 251,
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
        "dt": 1604790000,
        "temp": 282.81,
        "feels_like": 279.23,
        "pressure": 1024,
        "humidity": 87,
        "dew_point": 280.91,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.32,
        "wind_deg": 245,
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
        "dt": 1604793600,
        "temp": 282.76,
        "feels_like": 279.23,
        "pressure": 1023,
        "humidity": 88,
        "dew_point": 280.98,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.29,
        "wind_deg": 248,
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
        "dt": 1604797200,
        "temp": 282.68,
        "feels_like": 279.02,
        "pressure": 1023,
        "humidity": 88,
        "dew_point": 280.83,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.44,
        "wind_deg": 250,
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
        "dt": 1604800800,
        "temp": 282.39,
        "feels_like": 278.56,
        "pressure": 1022,
        "humidity": 86,
        "dew_point": 280.33,
        "clouds": 98,
        "visibility": 10000,
        "wind_speed": 4.48,
        "wind_deg": 255,
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
        "dt": 1604804400,
        "temp": 281.62,
        "feels_like": 278.03,
        "pressure": 1022,
        "humidity": 89,
        "dew_point": 279.94,
        "clouds": 93,
        "visibility": 10000,
        "wind_speed": 4.05,
        "wind_deg": 254,
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
        "dt": 1604808000,
        "temp": 280.78,
        "feels_like": 277.28,
        "pressure": 1022,
        "humidity": 92,
        "dew_point": 279.71,
        "clouds": 89,
        "visibility": 10000,
        "wind_speed": 3.82,
        "wind_deg": 249,
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
        "dt": 1604811600,
        "temp": 279.88,
        "feels_like": 276.54,
        "pressure": 1022,
        "humidity": 96,
        "dew_point": 279.32,
        "clouds": 84,
        "visibility": 10000,
        "wind_speed": 3.5,
        "wind_deg": 244,
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
        "dt": 1604815200,
        "temp": 279.38,
        "feels_like": 276.09,
        "pressure": 1022,
        "humidity": 96,
        "dew_point": 278.89,
        "clouds": 78,
        "visibility": 10000,
        "wind_speed": 3.28,
        "wind_deg": 251,
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
        "dt": 1604818800,
        "temp": 280.14,
        "feels_like": 276.74,
        "pressure": 1023,
        "humidity": 93,
        "dew_point": 279.21,
        "clouds": 70,
        "visibility": 10000,
        "wind_speed": 3.53,
        "wind_deg": 260,
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
        "dt": 1604822400,
        "temp": 281.01,
        "feels_like": 277.75,
        "pressure": 1023,
        "humidity": 90,
        "dew_point": 279.51,
        "clouds": 84,
        "visibility": 10000,
        "wind_speed": 3.44,
        "wind_deg": 263,
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
        "dt": 1604826000,
        "temp": 281.45,
        "feels_like": 278.29,
        "pressure": 1023,
        "humidity": 88,
        "dew_point": 279.61,
        "clouds": 90,
        "visibility": 10000,
        "wind_speed": 3.34,
        "wind_deg": 267,
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
        "dt": 1604829600,
        "temp": 281.91,
        "feels_like": 278.73,
        "pressure": 1023,
        "humidity": 85,
        "dew_point": 279.6,
        "clouds": 92,
        "visibility": 10000,
        "wind_speed": 3.35,
        "wind_deg": 264,
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
        "dt": 1604833200,
        "temp": 282.85,
        "feels_like": 279.56,
        "pressure": 1023,
        "humidity": 78,
        "dew_point": 279.28,
        "clouds": 91,
        "visibility": 10000,
        "wind_speed": 3.41,
        "wind_deg": 274,
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
        "dt": 1604836800,
        "temp": 283.62,
        "feels_like": 280.13,
        "pressure": 1024,
        "humidity": 72,
        "dew_point": 278.84,
        "clouds": 82,
        "visibility": 10000,
        "wind_speed": 3.57,
        "wind_deg": 286,
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
        "dt": 1604840400,
        "temp": 283.57,
        "feels_like": 280.47,
        "pressure": 1024,
        "humidity": 73,
        "dew_point": 279.07,
        "clouds": 12,
        "visibility": 10000,
        "wind_speed": 3.05,
        "wind_deg": 292,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604844000,
        "temp": 282.35,
        "feels_like": 279.43,
        "pressure": 1024,
        "humidity": 79,
        "dew_point": 279.03,
        "clouds": 11,
        "visibility": 10000,
        "wind_speed": 2.78,
        "wind_deg": 283,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604847600,
        "temp": 281.25,
        "feels_like": 278.29,
        "pressure": 1024,
        "humidity": 84,
        "dew_point": 278.85,
        "clouds": 13,
        "visibility": 10000,
        "wind_speed": 2.78,
        "wind_deg": 286,
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
        "dt": 1604851200,
        "temp": 280.76,
        "feels_like": 277.87,
        "pressure": 1025,
        "humidity": 87,
        "dew_point": 278.87,
        "clouds": 13,
        "visibility": 10000,
        "wind_speed": 2.69,
        "wind_deg": 294,
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
        "dt": 1604854800,
        "temp": 280.39,
        "feels_like": 277.67,
        "pressure": 1025,
        "humidity": 90,
        "dew_point": 278.95,
        "clouds": 13,
        "visibility": 10000,
        "wind_speed": 2.49,
        "wind_deg": 305,
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
        "dt": 1604858400,
        "temp": 280.11,
        "feels_like": 277.46,
        "pressure": 1026,
        "humidity": 92,
        "dew_point": 278.93,
        "clouds": 13,
        "visibility": 10000,
        "wind_speed": 2.4,
        "wind_deg": 313,
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
        "dt": 1604862000,
        "temp": 279.84,
        "feels_like": 277.11,
        "pressure": 1027,
        "humidity": 93,
        "dew_point": 278.84,
        "clouds": 2,
        "visibility": 10000,
        "wind_speed": 2.48,
        "wind_deg": 323,
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
        "dt": 1604865600,
        "temp": 279.42,
        "feels_like": 276.59,
        "pressure": 1027,
        "humidity": 94,
        "dew_point": 278.59,
        "clouds": 8,
        "visibility": 10000,
        "wind_speed": 2.54,
        "wind_deg": 348,
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
        "dt": 1604869200,
        "temp": 278.84,
        "feels_like": 275.99,
        "pressure": 1027,
        "humidity": 92,
        "dew_point": 277.75,
        "clouds": 9,
        "visibility": 10000,
        "wind_speed": 2.32,
        "wind_deg": 6,
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
        "dt": 1604872800,
        "temp": 278.3,
        "feels_like": 275.15,
        "pressure": 1028,
        "humidity": 88,
        "dew_point": 276.61,
        "clouds": 7,
        "visibility": 10000,
        "wind_speed": 2.44,
        "wind_deg": 7,
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
        "dt": 1604876400,
        "temp": 277.74,
        "feels_like": 274.51,
        "pressure": 1028,
        "humidity": 86,
        "dew_point": 275.65,
        "clouds": 6,
        "visibility": 10000,
        "wind_speed": 2.33,
        "wind_deg": 6,
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
        "dt": 1604880000,
        "temp": 277.22,
        "feels_like": 274.06,
        "pressure": 1029,
        "humidity": 85,
        "dew_point": 275.03,
        "clouds": 5,
        "visibility": 10000,
        "wind_speed": 2.07,
        "wind_deg": 9,
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
        "dt": 1604883600,
        "temp": 276.81,
        "feels_like": 273.52,
        "pressure": 1029,
        "humidity": 85,
        "dew_point": 274.65,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.16,
        "wind_deg": 3,
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
        "dt": 1604887200,
        "temp": 276.41,
        "feels_like": 273.07,
        "pressure": 1029,
        "humidity": 86,
        "dew_point": 274.35,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.18,
        "wind_deg": 7,
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
        "dt": 1604890800,
        "temp": 276.05,
        "feels_like": 272.71,
        "pressure": 1029,
        "humidity": 87,
        "dew_point": 274.14,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.14,
        "wind_deg": 12,
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
        "dt": 1604894400,
        "temp": 275.76,
        "feels_like": 272.55,
        "pressure": 1029,
        "humidity": 87,
        "dew_point": 273.97,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.89,
        "wind_deg": 11,
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
        "dt": 1604898000,
        "temp": 275.56,
        "feels_like": 272.41,
        "pressure": 1029,
        "humidity": 88,
        "dew_point": 273.9,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.8,
        "wind_deg": 15,
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
        "dt": 1604901600,
        "temp": 275.4,
        "feels_like": 272.6,
        "pressure": 1030,
        "humidity": 89,
        "dew_point": 273.79,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.3,
        "wind_deg": 20,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604905200,
        "temp": 276.29,
        "feels_like": 273.55,
        "pressure": 1030,
        "humidity": 85,
        "dew_point": 274.14,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.26,
        "wind_deg": 25,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604908800,
        "temp": 277.47,
        "feels_like": 274.82,
        "pressure": 1031,
        "humidity": 79,
        "dew_point": 274.22,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.17,
        "wind_deg": 32,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604912400,
        "temp": 278.5,
        "feels_like": 275.92,
        "pressure": 1031,
        "humidity": 73,
        "dew_point": 274.24,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.05,
        "wind_deg": 32,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604916000,
        "temp": 279.35,
        "feels_like": 276.76,
        "pressure": 1031,
        "humidity": 69,
        "dew_point": 274.19,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.07,
        "wind_deg": 35,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604919600,
        "temp": 279.89,
        "feels_like": 277.47,
        "pressure": 1031,
        "humidity": 65,
        "dew_point": 273.96,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 0.75,
        "wind_deg": 15,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604923200,
        "temp": 280.12,
        "feels_like": 277.61,
        "pressure": 1031,
        "humidity": 63,
        "dew_point": 273.59,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 0.84,
        "wind_deg": 340,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1604926800,
        "temp": 280.02,
        "feels_like": 277.69,
        "pressure": 1031,
        "humidity": 63,
        "dew_point": 273.65,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 0.56,
        "wind_deg": 326,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "pop": 0
      }
    ],
    "daily": [
      {
        "dt": 1604743200,
        "sunrise": 1604727632,
        "sunset": 1604759751,
        "temp": {
          "day": 283.57,
          "min": 281.6,
          "max": 283.57,
          "night": 282.8,
          "eve": 282.82,
          "morn": 281.6
        },
        "feels_like": {
          "day": 279.72,
          "night": 279.17,
          "eve": 279.77,
          "morn": 278.22
        },
        "pressure": 1029,
        "humidity": 94,
        "dew_point": 282.67,
        "wind_speed": 5.37,
        "wind_deg": 269,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": 100,
        "pop": 0,
        "uvi": 0.81
      },
      {
        "dt": 1604829600,
        "sunrise": 1604814154,
        "sunset": 1604846039,
        "temp": {
          "day": 281.45,
          "min": 278.84,
          "max": 283.62,
          "night": 278.84,
          "eve": 281.25,
          "morn": 281.62
        },
        "feels_like": {
          "day": 278.29,
          "night": 275.99,
          "eve": 278.29,
          "morn": 278.03
        },
        "pressure": 1023,
        "humidity": 88,
        "dew_point": 279.61,
        "wind_speed": 3.34,
        "wind_deg": 267,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": 90,
        "pop": 0,
        "uvi": 0.66
      },
      {
        "dt": 1604916000,
        "sunrise": 1604900676,
        "sunset": 1604932329,
        "temp": {
          "day": 278.5,
          "min": 275.4,
          "max": 280.12,
          "night": 276.3,
          "eve": 277.69,
          "morn": 276.05
        },
        "feels_like": {
          "day": 275.92,
          "night": 273.63,
          "eve": 275.27,
          "morn": 272.71
        },
        "pressure": 1031,
        "humidity": 73,
        "dew_point": 274.24,
        "wind_speed": 1.05,
        "wind_deg": 32,
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
        "uvi": 0.59
      },
      {
        "dt": 1605002400,
        "sunrise": 1604987197,
        "sunset": 1605018621,
        "temp": {
          "day": 278.47,
          "min": 275.24,
          "max": 280.05,
          "night": 276.07,
          "eve": 277.66,
          "morn": 275.24
        },
        "feels_like": {
          "day": 275.27,
          "night": 272.98,
          "eve": 274.89,
          "morn": 272.51
        },
        "pressure": 1034,
        "humidity": 69,
        "dew_point": 273.37,
        "wind_speed": 1.76,
        "wind_deg": 202,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "clouds": 55,
        "pop": 0,
        "uvi": 0.59
      },
      {
        "dt": 1605088800,
        "sunrise": 1605073718,
        "sunset": 1605104915,
        "temp": {
          "day": 277.07,
          "min": 274.27,
          "max": 278.44,
          "night": 275.54,
          "eve": 276.49,
          "morn": 274.85
        },
        "feels_like": {
          "day": 273.19,
          "night": 271.57,
          "eve": 272.55,
          "morn": 271.47
        },
        "pressure": 1031,
        "humidity": 76,
        "dew_point": 273.41,
        "wind_speed": 2.73,
        "wind_deg": 160,
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
        "uvi": 0.6
      },
      {
        "dt": 1605175200,
        "sunrise": 1605160239,
        "sunset": 1605191211,
        "temp": {
          "day": 277.02,
          "min": 274.48,
          "max": 278.56,
          "night": 274.48,
          "eve": 276.24,
          "morn": 275.06
        },
        "feels_like": {
          "day": 273.06,
          "night": 270.37,
          "eve": 272.45,
          "morn": 271.21
        },
        "pressure": 1025,
        "humidity": 77,
        "dew_point": 273.49,
        "wind_speed": 2.87,
        "wind_deg": 134,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": 99,
        "pop": 0,
        "uvi": 0.58
      },
      {
        "dt": 1605261600,
        "sunrise": 1605246759,
        "sunset": 1605277509,
        "temp": {
          "day": 276.31,
          "min": 274.07,
          "max": 277.59,
          "night": 277.15,
          "eve": 277.22,
          "morn": 274.17
        },
        "feels_like": {
          "day": 270.49,
          "night": 272.17,
          "eve": 271.95,
          "morn": 269.32
        },
        "pressure": 1027,
        "humidity": 84,
        "dew_point": 273.87,
        "wind_speed": 5.63,
        "wind_deg": 135,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 94,
        "pop": 0.69,
        "rain": 1.87,
        "uvi": 0.56
      },
      {
        "dt": 1605348000,
        "sunrise": 1605333278,
        "sunset": 1605363809,
        "temp": {
          "day": 278.01,
          "min": 274.67,
          "max": 279.08,
          "night": 274.67,
          "eve": 276.46,
          "morn": 277.04
        },
        "feels_like": {
          "day": 273.49,
          "night": 271.05,
          "eve": 272.78,
          "morn": 272.49
        },
        "pressure": 1032,
        "humidity": 84,
        "dew_point": 275.68,
        "wind_speed": 4.16,
        "wind_deg": 130,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "clouds": 97,
        "pop": 0.57,
        "rain": 0.12,
        "uvi": 0.57
      }
    ],
    "alerts": [
      {
        "sender_name": "Lietuvos hidrometeologijos tarnyba prie Aplinkos ministerijos",
        "event": "Fog",
        "start": 1604790000,
        "end": 1604876399,
        "description": "At night locally fog."
      }
    ]
  };

  const fetchWeather = async () => {
    setWeatherLoaded(false);
    try {
      // const res = await axios.get(WEATHER_URL_HOME);
      // setGlobalStore({...globalStore, JSON: res.data, isAppLoaded: true});
      setGlobalStore({...globalStore, JSON: rezultatas, isAppLoaded: true});
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

  return (
    weatherLoaded
    ? (
      <div>
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
    )
    : <div className="loadingDiv"><Ripple size={154} /></div>
  );
}
