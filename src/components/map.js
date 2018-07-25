import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Header from './header';

  const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={9}
      onClick={ props.onMapClick }
      defaultCenter={{ lat: props.latitude, lng: props.longitude }}
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
            city: props.city
        }
    }

    ReverseGeocoding = (lat, lng) => {
      let GEO_URL_HOME = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAutjbbZSVrwGSKMFq6F4b2wr4XHkssclk&latlng=";
      GEO_URL_HOME +=  + lat + ',' + lng;
      fetch(GEO_URL_HOME, {method:'GET'})
      .then(response => response.json())
      .then(json => {
          this.setState({
            city: json.results[0].formatted_address
          });
        });
      }
      
      handleMapClick = (event) => {
        this.setState ({
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        });
        this.ReverseGeocoding(event.latLng.lat(), event.latLng.lng());
        console.log(this.state.city);
      }

      render() { 
          return (
            <div>
          <Header lat={ this.state.lat } lng={ this.state.lng } city={ this.state.city } />
          <MyMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAutjbbZSVrwGSKMFq6F4b2wr4XHkssclk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          latitude={ this.state.lat }
          longitude={ this.state.lng }
          onMapClick={ this.handleMapClick } />
          </div>);
      }
  }

  export default Map;
