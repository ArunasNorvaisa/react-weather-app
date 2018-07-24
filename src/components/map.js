import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

  const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={9}
      onClick={ props.onMapClick }
      defaultCenter={{ lat: props.latitude, lng: props.longitude }}
      center={{ lat: props.latitude, lng: props.longitude }}
    >
      <Marker
        position={{ lat: props.latitude, lng: props.longitude }}
      />
    </GoogleMap>
  ));

  class Map extends Component {

    constructor(props) {
        super(props);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            center: {
              lat: props.lat,
              lng: props.lng
            }
        }
    }

    handleMapClick = (event) => {
        this.setState ({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
        console.log(this.state);
      }

      render() { 
          return <MyMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAutjbbZSVrwGSKMFq6F4b2wr4XHkssclk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          latitude={ this.state.lat }
          longitude={ this.state.lng }
          center={ this.state.center }
          onMapClick={ this.handleMapClick } />;
      }
  }

  export default Map;
