import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import Map from './Map';
import { GlobalStoreContext } from './Store';

export default function App() {

  const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;
  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        reverseGeocoded(position.coords.latitude, position.coords.longitude);
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
    setGlobalStore({
      ...globalStore,
      latitude: json.data.latitude,
      longitude: json.data.longitude,
      city: json.data.city,
      address: json.data.city,
      isAppLoaded: true
    });
  };

  const reverseGeocoded = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const json = await axios.get(GEO_URL_HOME);
    setGlobalStore({
      ...globalStore,
      latitude: lat,
      longitude: lng,
      city: json.data.results[0].address_components[2].short_name,
      address: json.data.results[0].address_components[2].short_name,
      isAppLoaded: true
    });
  };

  const handleAddressSearch = async name => {
    const GOOGLE_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY_GOOGLE}`;

    const json = await axios.get(GOOGLE_URL_HOME);
    setGlobalStore({
      ...globalStore,
      latitude: json.data.results[0].geometry.location.lat,
      longitude: json.data.results[0].geometry.location.lng,
      city: json.data.results[0].formatted_address,
      address: json.data.results[0].formatted_address
    });
  };

  const reverseGeocoding = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const json = await axios.get(GEO_URL_HOME);
    if (json.data.status !== 'ZERO_RESULTS') {
      setGlobalStore({
        ...globalStore,
        city: json.data.results[0].address_components[2].short_name,
        address: json.data.results[0].formatted_address,
        latitude: lat,
        longitude: lng
      });
    } else {
      setGlobalStore({
        ...globalStore,
        city: "There's nothing here, please check where you click",
        address: "There's nothing here, please check where you click",
        latitude: lat,
        longitude: lng
      });
    }
  };

  const handleMapClick = event => {
    reverseGeocoding(event.latLng.lat(), event.latLng.lng());
  };

  return (
    globalStore.isAppLoaded ?
      <Map
        handleMapClick={handleMapClick}
        handleAddressSearch={handleAddressSearch}
      /> :
    <h2>Application is loading, please be patient...</h2>
  );
}
