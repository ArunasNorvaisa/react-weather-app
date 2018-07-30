import React, { Component } from 'react';
import ReactWeather from "react-open-weather";
import "react-open-weather/lib/css/ReactWeather.css";

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            latitude: props.latitude,
            longitude: props.longitude,
            city: props.city,
            JSON: ''
        }
    }

    getWeather = () => {
        let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
        WEATHER_URL_HOME += 'https://api.forecast.io/forecast/ca6e7e0fcf7c0c02e8ab0f3412e145b8/';
        WEATHER_URL_HOME += `${this.props.latitude},${this.props.longitude}`;
        WEATHER_URL_HOME += '?units=si&exclude=hourly%2Cflags';
        this.setState({
            isLoaded: false
        });

        fetch(WEATHER_URL_HOME, {method:'GET'})
        .then(response => response.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                latitude: json.latitude,
                longitude: json.longitude,
                JSON: json
            });
        });
    }
      
    componentDidMount() {
        this.getWeather();
    };

    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
            this.getWeather();
        }
    }

    render() {
        if (this.state.isLoaded) {
            return <div>
                {this.props.city}, temperature: {this.state.JSON.currently.temperature} <br />
                { `${this.props.latitude}, ${this.props.longitude}, ${this.props.city}` }
                <ReactWeather
                    forecast="5days"
                    apikey="0dde434f020b43b6adf152044182507"
                    type="geo"
                    lat={ this.props.latitude.toString() }
                    lon={ this.props.longitude.toString() }
                />
            </div>;
        } else {
            return <h2>Loading, please wait...</h2>;
        }
    }
}
 
export default Weather;
