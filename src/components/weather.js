import React, { Component } from 'react';
import WeatherByTheHour from './weatherbythehour';
import WeatherNow from './weathernow';

const API_KEY_DARKSKY =`${process.env.REACT_APP_API_KEY_DS}`;

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTemperatureInC: true,
            isLoaded: false,
            JSON: null
        }
    }

    getDate = time => {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: this.state.JSON.timezone
        };
        return new Date(time * 1e3).toLocaleDateString('en', options);
    };

    getForecast = date => {
        // de-structuring icon, time, temperatureLow, temperatureHigh, summary from the
        // application state so we don't have to keep typing this.state.JSON.etc...
        let { icon, time, temperatureLow, temperatureHigh, summary } = this.state.JSON.daily.data[date];
        const icon_URL = "./images/icons/" + icon + ".svg";
        // Calculating temperature in Fahrenheit
        if(!this.state.isTemperatureInC) {
            temperatureLow = temperatureLow * 1.8 + 32;
            temperatureHigh = temperatureHigh * 1.8 + 32;
        }

        return <div>
            <div className="icon">
                <img src={ icon_URL } alt="icon"/>
            </div>
            <div className="date">{ this.getDate(time) }</div>
            <div className="tToday">
                { temperatureLow.toFixed(0) }&deg;
                /&nbsp;
                { temperatureHigh.toFixed(0) }&deg;
                { this.state.isTemperatureInC ? "C" : "F" }
            </div>
            <div className="forecastSummary">{ summary }</div>
            <hr />
        </div>;
    };

    fetchWeather = () => {
        let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
        WEATHER_URL_HOME += `https://api.forecast.io/forecast/${API_KEY_DARKSKY}/`;
        WEATHER_URL_HOME += `${this.props.latitude},${this.props.longitude}`;
        WEATHER_URL_HOME += '?units=si&exclude=flags%2Cminutely';
        this.setState({
            isLoaded: false
        });

        fetch(WEATHER_URL_HOME, { method:'GET' })
        .then(response => response.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                JSON: json
            });
        });
    };

    handleTemperatureUnitChange = event => {
        event.preventDefault();
        this.setState({
            isTemperatureInC: !this.state.isTemperatureInC
        });
    };

    componentDidMount() {
        this.fetchWeather();
    };

    componentDidUpdate(prevProps) {
        if(this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
            this.fetchWeather();
        }
    };

    render() {
        return this.state.isLoaded ?
            <React.Fragment>
                <WeatherByTheHour JSON={ this.state.JSON } isTemperatureInC={ this.state.isTemperatureInC }/>
                <div className="renderedWeather">
                    <button className="cOrF" onClick={ event => this.handleTemperatureUnitChange(event) }>
                        Switch to &deg;{ this.state.isTemperatureInC ? "F" : "C" }
                    </button>
                    <div className="leftPanel">
                        <div className="cityName">{ this.props.city }</div>
                        <WeatherNow
                            JSON={ this.state.JSON }
                            isTemperatureInC={ this.state.isTemperatureInC }
                        />
                    </div>
                    <div className="rightPanel">
                        <div className="dailyWeather">{ this.getForecast(1) }</div>
                        <div className="dailyWeather">{ this.getForecast(2) }</div>
                        <div className="dailyWeather">{ this.getForecast(3) }</div>
                        <div className="poweredBy">Powered by <a href="http://darksky.net/poweredby/">Dark Sky</a></div>
                    </div>
                </div>
            </React.Fragment> :
        <h3>Loading weather, please wait...</h3>;
    }
}
