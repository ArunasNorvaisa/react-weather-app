import React, { PureComponent } from 'react';
import Map from './map';

const API_KEY =`${process.env.REACT_APP_API_KEY_GL}`;

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            latitude: null,
            longitude: null,
            city: null
        };
    }

    getIP = () => {
        const IP_URL_HOME = 'https://ipapi.co/json/';
        fetch(IP_URL_HOME, { method:'GET' })
        .then(response => response.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                latitude: json.latitude,
                longitude: json.longitude,
                city: json.city
            });
        });
    }

    reverseGeocoded = (lat, lng) => {
        let GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&latlng=`;
        GEO_URL_HOME += +lat + ',' + lng;
        fetch(GEO_URL_HOME, { method: 'GET' })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    city: json.results[1].address_components[1].short_name
                });
            });
        };

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.reverseGeocoded(position.coords.latitude, position.coords.longitude);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
                this.getIP();
            },
            {
                timeout: 6000,
                enableHighAccuracy: false
            }
        );
    }

    componentDidMount() {
        this.getLocation();
    };

    render() {
        const { latitude, longitude, city } = this.state;
        return this.state.isLoaded
        ? <div className="wrapper">
            <Map lat={ latitude }
                lng={ longitude }
                city={ city }
                address={ city }
            />
        </div>
        : <h2>Application is loading, please be patient...</h2>
    }
}

export default App;
