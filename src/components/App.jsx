import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import buildUrl from 'build-url';
import { Ripple } from 'react-css-spinners/dist/Ripple';

import Error from './Error';
import Map from './Map';
import Header from './Header';
import Weather from './Weather';
import { GlobalStoreContext } from './Store';
import '../css/style.scss';

const urlParams = new URLSearchParams(window.location.search);

export default function App() {

  const API_KEY_GOOGLE = process.env.API_KEY_GOOGLE_GEOCODING;
  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if(urlParams.has('search')) {
      handleAddressSearch(urlParams.get('search'));
    } else {
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
  }

  async function getCoordinatesByIP () {
    const URL = 'https://ipapi.co/json/';

    try {
      const json = await axios.get(URL);
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
      setGlobalStore({
        ...globalStore,
        error: err
      });
    }
  }

  async function reverseGeocoding(lat, lng) {
    // IF YOU ARE NOT USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO geocodingproxy.php OR
    // COMMENT THIS VARIABLE OUT IF YOU ARE USING PROXY:
    // const URL = buildUrl('https://reactweatherapp.com/', {
    //   path: 'proxy/geocodingproxy.php',
    //   queryParams: { lat, lng }
    // });

    // IF YOU ARE USING PROXY, COMMENT FOLLOWING VARIABLE OUT:
    const URL = buildUrl('https://maps.googleapis.com/', {
      path: 'maps/api/geocode/json',
      queryParams: {
        key: API_KEY_GOOGLE,
        latlng: [lat ,lng]
      }
    });

    window.history.replaceState(location.origin, document.title, location.origin);

    try {
      const json = await axios.get(URL);
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
        // Below, we cover places that haven't Google addresses. Try Pacific Ocean. ;)
      } else {
        setGlobalStore({
          ...globalStore,
          city: 'There\'s nothing here, please check where you click',
          address: 'There\'s nothing here, please check where you click',
          latitude: lat,
          longitude: lng,
          isAppLoaded: true
        });
      }
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({
        ...globalStore,
        isAppLoaded: false,
        error: err
      });
    }
  }

  async function handleAddressSearch(address) {
    // IF YOU ARE NOT USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO geocodingproxy.php OR
    // COMMENT THIS VARIABLE OUT IF YOU ARE USING PROXY:
    // const URL = buildUrl('https://reactweatherapp.com/', {
      // path: 'proxy/geocodingproxy.php',
      // queryParams: { address }
    // });

    // IF YOU ARE USING PROXY, COMMENT FOLLOWING VARIABLE OUT:
    const URL = buildUrl('https://maps.googleapis.com/', {
      path: 'maps/api/geocode/json',
      queryParams: {
        address,
        key: API_KEY_GOOGLE
      }
    });

    setGlobalStore({
      ...globalStore,
      city: '',
      address: '',
      isAppLoaded: false
    });

    const newURL = location.origin + '?search=' + encodeURI(address);
    window.history.pushState(newURL, document.title, newURL);

    try {
      const json = await axios.get(URL);
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
        isAppLoaded: false,
        error: err
      });
    }
  }

  function handleMapClick({lat, lng}) {
    reverseGeocoding(lat, lng);
  }

  if(globalStore.error) {
    return (
      <div className="loadingDiv">
        <Ripple size={154} />
        <Error message={globalStore.error ? globalStore.error.message : 'SOMETHING WRONG HAPPENED'}/>
      </div>
    );
  }

  if(!globalStore.isAppLoaded) return <div className="loadingDiv"><Ripple size={154} /></div>;

  return (
    <>
      <Header handleAddressSearch={handleAddressSearch} />
      <Weather />
      <Map handleMapClick={handleMapClick} />
    </>
  );
}
