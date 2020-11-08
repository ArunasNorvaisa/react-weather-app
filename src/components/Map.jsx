import React, { Fragment, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { GlobalStoreContext } from './Store';
import '../css/marker.scss';

export default function Map(props) {

  const API_KEY_GOOGLE = process.env.API_KEY_GOOGLE_MAPS;
  const [globalStore] = useContext(GlobalStoreContext);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY_GOOGLE }}
        center={{lat: globalStore.latitude, lng: globalStore.longitude}}
        defaultZoom={9}
        onClick={props.handleMapClick}
      >
        <Marker lat={globalStore.latitude} lng={globalStore.longitude} />
      </GoogleMapReact>
    </div>
  )
}

function Marker() {
  return (
    <Fragment>
      <div className="pin"></div>
      <div className="pulse"></div>
    </Fragment>
  );
}
