import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Header from './header';
import Weather from './weather';

const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;

const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={6}
        onClick={ props.onMapClick }
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
        center={{ lat: props.latitude, lng: props.longitude }}
    >
    <Marker
        position={{ lat: props.latitude, lng: props.longitude }}
    />
    </GoogleMap>
));

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: props.lat,
            longitude: props.lng,
            city: props.city,
            address: props.city
        }
    }

    handleAddressSearch = name => {
        let GOOGLE_URL_HOME = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        GOOGLE_URL_HOME += name + `&key=${API_KEY_GOOGLE}`;

        fetch(GOOGLE_URL_HOME, {method:'GET'})
        .then(response => response.json())
        .then(json => {
            this.setState({
                latitude: json.results[0].geometry.location.lat,
                longitude: json.results[0].geometry.location.lng,
                city: json.results[0].formatted_address,
                address: json.results[0].formatted_address
            });
        });
    };

    reverseGeocoding = (lat, lng) => {
        let GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY_GOOGLE}&latlng=`;
        GEO_URL_HOME += + lat + ',' + lng;
        fetch(GEO_URL_HOME, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            if (json.status !== "ZERO_RESULTS") {
                this.setState({
                    address: json.results[0].formatted_address,
                    city: json.results[0].address_components[2].short_name
                })
            } else {
                this.setState({
                    address: "There's nothing here, please check where you click",
                    city: "There's nothing here, please check where you click"
                });
            }
        });
    };

    handleMapClick = event => {
        this.setState({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
        });
        this.reverseGeocoding(event.latLng.lat(), event.latLng.lng());
    };

    render() {
        // de-structuring latitude, longitude, city, address from the
        // application state so we don't have to keep typing this.state.
        const { latitude, longitude, city, address } = this.state;
        return (
            <React.Fragment>
                <Header
                    latitude={ latitude }
                    longitude={ longitude }
                    address={ address }
                    city={ city }
                    handleAddressSearch={ this.handleAddressSearch }
                />
                <Weather latitude={ latitude } longitude={ longitude } city={ city } />
                <MyMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY_GOOGLE}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={ <div style={{ height: `100%` }} /> }
                    containerElement={ <div style={{ height: `97vh` }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                    latitude={ latitude }
                    longitude={ longitude }
                    onMapClick={ this.handleMapClick }
                />
            </React.Fragment>
        );
    }
}
