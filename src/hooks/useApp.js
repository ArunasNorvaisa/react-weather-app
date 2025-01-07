import { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../components/Store.jsx';
import axios from 'axios';
import buildUrl from 'build-url';

const urlParams = new URLSearchParams(window.location.search);

export default function useApp() {
  const API_KEY_GOOGLE = import.meta.env.VITE_API_KEY_GOOGLE_GEOCODING;
  const { globalState, setGlobalState, setError, setIsAppLoaded, resetStore } = useContext(GlobalStoreContext);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (urlParams.has('search')) {
      handleAddressSearch(urlParams.get('search'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocoding(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
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

  async function getCoordinatesByIP() {
    const url = 'https://ipapi.co/json/';
    setIsAppLoaded(false);

    try {
      const axiosResponse = await axios.get(url);
      setGlobalState((prevState) => ({
        ...prevState,
        latitude: axiosResponse.data.latitude,
        longitude: axiosResponse.data.longitude,
        city: axiosResponse.data.city,
        address: axiosResponse.data.city,
        isAppLoaded: true
      }));
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setError(err);
    }
  }

  async function reverseGeocoding(lat, lng) {
    // IF YOU ARE NOT USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO geocodingproxy.php OR
    // COMMENT THIS VARIABLE OUT IF YOU ARE USING PROXY:
    // const url = buildUrl('https://YOUR_DOMAIN.com/', {
    //   path: 'proxy/geocodingproxy.php',
    //   queryParams: { lat, lng }
    // });

    // IF YOU ARE USING PROXY, COMMENT FOLLOWING VARIABLE OUT:
    const url = buildUrl('https://maps.googleapis.com/', {
      path: 'maps/api/geocode/json',
      queryParams: {
        key: API_KEY_GOOGLE,
        latlng: [lat, lng]
      }
    });

    window.history.replaceState(location.origin, document.title, location.origin);

    try {
      const axiosResponse = await axios.get(url);
      if (axiosResponse.data.results.length !== 0) {
        if (axiosResponse.data.results[0].address_components.length > 2) {
          setGlobalState((prevState) => ({
            ...prevState,
            city: axiosResponse.data.results[0].address_components[2].short_name,
            address: axiosResponse.data.results[0].formatted_address,
            latitude: lat,
            longitude: lng,
            isAppLoaded: true
          }));
          // Below, we cover places that have Google 'addresses' but generally aren't populated
          // Baltic Sea is the best example. ;)
        } else {
          setGlobalState((prevState) => ({
            ...prevState,
            city: axiosResponse.data.results[0].address_components[0].short_name,
            address: axiosResponse.data.results[0].formatted_address,
            latitude: lat,
            longitude: lng,
            isAppLoaded: true
          }));
        }
        // Below, we cover places that haven't Google addresses. Try Pacific Ocean. ;)
      } else {
        setGlobalState((prevState) => ({
          ...prevState,
          city: "There's nothing here, please check where you click",
          address: "There's nothing here, please check where you click",
          latitude: lat,
          longitude: lng,
          isAppLoaded: true
        }));
      }
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setError(err);
      setIsAppLoaded(false);
    }
  }

  async function handleAddressSearch(address) {
    // IF YOU ARE NOT USING PROXY, CHANGE BELOW URL TO REFLECT PATH TO geocodingproxy.php OR
    // COMMENT THIS VARIABLE OUT IF YOU ARE USING PROXY:
    // const url = buildUrl('https://YOUR_DOMAIN.com/', {
    //   path: 'proxy/geocodingproxy.php',
    //   queryParams: { address }
    // });

    // IF YOU ARE USING PROXY, COMMENT FOLLOWING VARIABLE OUT:
    const url = buildUrl('https://maps.googleapis.com/', {
      path: 'maps/api/geocode/json',
      queryParams: {
        address,
        key: API_KEY_GOOGLE
      }
    });

    resetStore();

    const newURL = location.origin + '?search=' + encodeURI(address);
    window.history.pushState(newURL, document.title, newURL);

    try {
      const axiosResponse = await axios.get(url);
      setGlobalState((prevState) => ({
        ...prevState,
        latitude: axiosResponse.data.results[0].geometry.location.lat,
        longitude: axiosResponse.data.results[0].geometry.location.lng,
        city: axiosResponse.data.results[0].formatted_address,
        address: axiosResponse.data.results[0].formatted_address,
        isAppLoaded: true
      }));
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setError(err);
      setIsAppLoaded(false);
    }
  }

  function handleMapClick({ lat, lng }) {
    reverseGeocoding(lat, lng);
  }

  return {
    globalState,
    handleAddressSearch,
    handleMapClick
  };
}
