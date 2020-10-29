import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Ripple } from 'react-css-spinners/dist/Ripple';
import Map from './Map';
import Header from './Header';
import Weather from './Weather';
import { GlobalStoreContext } from './Store';

export default function App() {

  const API_KEY_GOOGLE = process.env.REACT_APP_API_KEY_GL;
  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        reverseGeocoding(position.coords.latitude, position.coords.longitude);
      },
      err => {
        console.error(`ERROR(${err.code}): ${err.message}`);
        getCoordinatesByIP();
      },
      {
        timeout: 6000,
        enableHighAccuracy: false
      }
    );
  }

  async function getCoordinatesByIP () {
    const IP_URL_HOME = 'https://ipapi.co/json/';

    try {
      const json = await axios.get(IP_URL_HOME);
      setGlobalStore({
        ...globalStore,
        latitude: json.data.latitude,
        longitude: json.data.longitude,
        city: json.data.city,
        address: json.data.city,
        isAppLoaded: true
      });
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async function reverseGeocoding(lat, lng) {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;

    try {
      const json = await axios.get(GEO_URL_HOME);
      if (json.data.results.length !== 0) {
        if (json.data.results[0].address_components.length > 2) {
          setGlobalStore({
            ...globalStore,
            city: json.data.results[0].address_components[2].short_name,
            address: json.data.results[0].formatted_address,
            latitude: lat,
            longitude: lng,
            isAppLoaded: true
          });
          // Below, we cover places that have Google 'addresses' but generally aren't populated
          // Baltic Sea is the best example. ;)
        } else {
          setGlobalStore({
            ...globalStore,
            city: json.data.results[0].address_components[0].short_name,
            address: json.data.results[0].formatted_address,
            latitude: lat,
            longitude: lng,
            isAppLoaded: true
          });
        }
        // Below, we cover places that haven't Google 'addresses' Pacific Ocean is the best example. ;)
      } else {
        setGlobalStore({
          ...globalStore,
          city: "There's nothing here, please check where you click",
          address: "There's nothing here, please check where you click",
          latitude: lat,
          longitude: lng,
          isAppLoaded: true
        });
      }
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({
        ...globalStore,
        isAppLoaded: false
      });
    }
  }

  async function handleAddressSearch(name) {
    const GOOGLE_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY_GOOGLE}`;
    setGlobalStore({
      ...globalStore,
      city: '',
      address: '',
      isAppLoaded: false
    });

    try {
      const json = await axios.get(GOOGLE_URL_HOME);
      setGlobalStore({
        ...globalStore,
        latitude: json.data.results[0].geometry.location.lat,
        longitude: json.data.results[0].geometry.location.lng,
        city: json.data.results[0].formatted_address,
        address: json.data.results[0].formatted_address,
        isAppLoaded: true
      });
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({
        ...globalStore,
        isAppLoaded: false
      });
    }
  }

  function handleMapClick({lat, lng}) {
    reverseGeocoding(lat, lng);
  }

  console.log('L97 globalStore ===', globalStore);

  return (
    globalStore.isAppLoaded
      ? (
        <>
          <Header handleAddressSearch={handleAddressSearch} />
          <Weather />
          <Map handleMapClick={handleMapClick} />
        </>
      )
      : <div className="loadingDiv"><Ripple size={154} /></div>
  );
}
