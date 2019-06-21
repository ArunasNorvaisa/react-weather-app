import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './map';

export default function App() {

  const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
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

  const getIP = async () => {
    const IP_URL_HOME = 'https://ipapi.co/json/';
    const json = await axios.get(IP_URL_HOME);
    setLatitude(json.data.latitude);
    setLongitude(json.data.longitude);
    setCity(json.data.city);
    setAddress(json.data.city);
    setIsLoaded(true);
  };

  const reverseGeocoded = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const json = await axios.get(GEO_URL_HOME);
    setCity(json.data.results[0].address_components[2].short_name);
    setAddress(json.data.results[0].address_components[2].short_name);
    setIsLoaded(true);
  };

  const handleAddressSearch = async name => {
    const GOOGLE_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY_GOOGLE}`;

    const json = await axios.get(GOOGLE_URL_HOME);
    setLatitude(json.data.results[0].geometry.location.lat);
    setLongitude(json.data.results[0].geometry.location.lng);
    setCity(json.data.results[0].formatted_address);
    setAddress(json.data.results[0].formatted_address);
  };

  const reverseGeocoding = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const json = await axios.get(GEO_URL_HOME);
    if (json.data.status !== "ZERO_RESULTS") {
      setAddress(json.data.results[0].formatted_address);
      setCity(json.data.results[0].address_components[2].short_name);
    } else {
      setAddress("There's nothing here, please check where you click");
      setCity("There's nothing here, please check where you click");
    }
  };

  const handleMapClick = event => {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
    reverseGeocoding(event.latLng.lat(), event.latLng.lng());
  };

  return isLoaded ?
    <React.Fragment>
      <Map latitude={latitude}
           longitude={longitude}
           city={city}
           address={address}
           handleMapClick={handleMapClick}
           handleAddressSearch={handleAddressSearch}
      />
    </React.Fragment> :
    <h2>Application is loading, please be patient...</h2>
}
