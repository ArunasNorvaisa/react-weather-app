import { Fragment, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { GlobalStoreContext } from './Store';
import '../css/marker.scss';

export default function Map({ handleMapClick }) {
  const API_KEY_GOOGLE = import.meta.env.VITE_API_KEY_GOOGLE_MAPS;
  const { globalState } = useContext(GlobalStoreContext);
  const { latitude, longitude } = globalState;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY_GOOGLE }}
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={9}
        onClick={handleMapClick}
      >
        <Marker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  );
}

function Marker() {
  return (
    <Fragment>
      <div className="pin"></div>
      <div className="pulse"></div>
    </Fragment>
  );
}
