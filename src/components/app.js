import React, { useState, useEffect } from 'react';
import Map from './map';

export default function App() {

  const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [city, setCity] = useState(null);
  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          reverseGeocoded(position.coords.latitude, position.coords.longitude);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        err => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          getIP();
        },
        {
          timeout: 6000,
          enableHighAccuracy: false
        }
      );
    };
    getLocation();

  });

  const getIP = async () => {
    const IP_URL_HOME = 'https://ipapi.co/json/';
    const response = await fetch(IP_URL_HOME, {method:'GET'});
    const json = await response.json();
    setLatitude(json.latitude);
    setLongitude(json.longitude);
    setCity(json.city);
    setIsLoaded(true);
  };

  const reverseGeocoded = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const response = await fetch(GEO_URL_HOME, {method: 'GET'});
    const json = await response.json();
    setCity(json.results[0].address_components[2].short_name);
    setIsLoaded(true);
  };

  return isLoaded ?
    <React.Fragment>
      <Map lat={latitude}
           lng={longitude}
           city={city}
           address={city}
      />
    </React.Fragment> :
    <h2>Application is loading, please be patient...</h2>
}
