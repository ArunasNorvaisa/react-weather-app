import React, { useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Header from './header';
import Weather from './weather';

export default function Map(props) {

  const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;

  const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      onClick={props.onMapClick}
      defaultCenter={{lat: props.latitude, lng: props.longitude}}
      center={{lat: props.latitude, lng: props.longitude}}
    >
      <Marker
        position={{lat: props.latitude, lng: props.longitude}}
      />
    </GoogleMap>
  ));

  const [latitude, setLatitude] = useState(props.lat);
  const [longitude, setLongitude] = useState(props.lng);
  const [city, setCity] = useState(props.city);
  const [address, setAddress] = useState(props.city);

  const handleAddressSearch = async name => {
    const GOOGLE_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY_GOOGLE}`;

    const response = await fetch(GOOGLE_URL_HOME, {method:'GET'});
    const json = await response.json();
    setLatitude(json.results[0].geometry.location.lat);
    setLongitude(json.results[0].geometry.location.lng);
    setCity(json.results[0].formatted_address);
    setAddress(json.results[0].formatted_address);
  };

  const reverseGeocoding = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const response = await fetch(GEO_URL_HOME, {method: 'GET'});
    const json = await response.json();
    if (json.status !== "ZERO_RESULTS") {
      setAddress(json.results[0].formatted_address);
      setCity(json.results[0].address_components[2].short_name);
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

  return (
    <>
      <Header
        latitude={latitude}
        longitude={longitude}
        address={address}
        city={city}
        handleAddressSearch={handleAddressSearch}
      />
      <Weather latitude={latitude} longitude={longitude} city={city} />
      <MyMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY_GOOGLE}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={ <div style={{ height: `100%` }} /> }
        containerElement={ <div style={{ height: `97vh` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        latitude={latitude}
        longitude={longitude}
        onMapClick={handleMapClick}
      />
    </>
  );
}
