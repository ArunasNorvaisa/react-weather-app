import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Header from './header';
import Weather from './weather';

export default function Map(props) {

  const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;

  const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={7}
      onClick={props.onMapClick}
      defaultCenter={{lat: props.latitude, lng: props.longitude}}
      center={{lat: props.latitude, lng: props.longitude}}
    >
      <Marker
        position={{lat: props.latitude, lng: props.longitude}}
      />
    </GoogleMap>
  ));
  
  return (
    <>
      <Header
        latitude={props.latitude}
        longitude={props.longitude}
        address={props.address}
        city={props.city}
        handleAddressSearch={props.handleAddressSearch}
      />
      <Weather latitude={props.latitude} longitude={props.longitude} city={props.city} />
      <MyMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY_GOOGLE}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={ <div style={{ height: `100%` }} /> }
        containerElement={ <div style={{ height: `97vh` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        latitude={props.latitude}
        longitude={props.longitude}
        onMapClick={props.handleMapClick}
      />
    </>
  );
}
