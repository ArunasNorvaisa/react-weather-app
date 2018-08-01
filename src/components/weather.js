import React, { Component } from 'react';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            city: props.city,
            JSON: ''
        }
    }

    getDate(time) {
        let options = { weekday: 'short', month: 'short', day: 'numeric', timeZone: this.state.JSON.timezone };
        return new Date(time * 1e3).toLocaleDateString('en', options);
    }

    getForecast(date) {
        let icon = "./images/icons/" + this.state.JSON.daily.data[date].icon + ".svg";
        return <div>
            <div className="icon">
                <img src={ icon } alt="icon"/>
            </div>
            <div className="date">{ this.getDate(this.state.JSON.daily.data[date].time) }</div>
            <div className="tToday">
                {this.state.JSON.daily.data[date].temperatureLow.toFixed(0)}&deg;
                /&nbsp;
                {this.state.JSON.daily.data[date].temperatureHigh.toFixed(0)}&deg;
            </div>
            <div className="forecastSummary">{ this.state.JSON.daily.data[date].summary }</div>
        </div>;
    }

    fetchWeather = () => {
        let WEATHER_URL_HOME = 'https://cors-anywhere.herokuapp.com/';
        WEATHER_URL_HOME += 'https://api.forecast.io/forecast/ca6e7e0fcf7c0c02e8ab0f3412e145b8/';
        WEATHER_URL_HOME += `${this.props.latitude},${this.props.longitude}`;
        WEATHER_URL_HOME += '?units=si&exclude=hourly%2Cflags%2Cminutely';
        this.setState({
            isLoaded: false
        });

        fetch(WEATHER_URL_HOME, {method:'GET'})
        .then(response => response.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                JSON: json
            });
        });
    };

    componentDidMount() {
        this.fetchWeather();
    };

    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
            this.fetchWeather();
        }
    }

    render() {
        if (this.state.isLoaded) {
            return <div className="renderedWeather">
                <div className="todayWeather">
                    <div className="cityName">{ this.props.city }</div>
                    <div>{ this.getForecast(0) }
                        <span className="intelligentForecast">{ this.state.JSON.daily.summary }</span>
                    </div>
                </div>
                <div className="futureForecast">
                    <div className="dailyWeather">{ this.getForecast(1) }</div>
                    <hr />
                    <div className="dailyWeather">{ this.getForecast(2) }</div>
                    <hr />
                    <div className="dailyWeather">{ this.getForecast(3) }</div>
                </div>
            </div>;
        } else {
            return <h3>Loading, please wait...</h3>;
        }
    }
}

export default Weather;
