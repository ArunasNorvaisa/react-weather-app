import React from 'react';
import SunCycle from './suncycle';

const WeatherNow = props => {
    const icon_URL = "./images/icons/" + props.JSON.currently.icon + ".svg";
    const timeNow = Math.round(new Date().getTime()/1000);
    let temperatureNow;
    let temperatureMin;
    let temperatureMax;

    if(props.isTemperatureInC) {
        temperatureNow = props.JSON.currently.temperature.toFixed(0);
        temperatureMin = props.JSON.daily.data[0].temperatureLow.toFixed(0);
        temperatureMax = props.JSON.daily.data[0].temperatureHigh.toFixed(0);
    } else {
        temperatureNow = (props.JSON.currently.temperature * 1.8 + 32).toFixed(0);
        temperatureMin = (props.JSON.daily.data[0].temperatureLow * 1.8 + 32).toFixed(0);
        temperatureMax = (props.JSON.daily.data[0].temperatureHigh * 1.8 + 32).toFixed(0);
    }

    const getTime = time => {
        const options = {
            timeZone: props.JSON.timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Date(time * 1e3).toLocaleTimeString('en', options);
    };

    return props.JSON.currently.precipType ?
        <div className="todayWeather">
            <SunCycle
                sunrise={ props.JSON.daily.data[0].sunriseTime }
                sunset={ props.JSON.daily.data[0].sunsetTime }
                timezone={ props.JSON.timezone }
            />
            <div className="tToday">{ temperatureMin } / { temperatureMax }&deg;{ props.isTemperatureInC ? "C" : "F" }</div>
            <div>{ props.JSON.currently.summary }</div>
            <div className="tNow">{ temperatureNow }&deg;{ props.isTemperatureInC ? "C" : "F" }
                <img src={ icon_URL } alt={ props.JSON.currently.icon } />
            </div>
            <div>
                { props.JSON.currently.precipType } { (props.JSON.currently.precipProbability * 100).toFixed(0) }%
            </div>
            <div className="timeNow">{ getTime(timeNow) }</div>
            <hr />
            <div>{ props.JSON.hourly.summary }</div>
        </div> :
        <div className="todayWeather">
            <SunCycle
                sunrise={ props.JSON.daily.data[0].sunriseTime }
                sunset={ props.JSON.daily.data[0].sunsetTime }
                timezone={ props.JSON.timezone }
            />
            <div className="tToday">{ temperatureMin } / { temperatureMax }&deg;{ props.isTemperatureInC ? "C" : "F" }</div>
            <div>{ props.JSON.currently.summary }</div>
            <div className="tNow">{ temperatureNow }&deg;{ props.isTemperatureInC ? "C" : "F" }
                <img src={ icon_URL } alt={ props.JSON.currently.icon } />
            </div>
            <div className="timeNow">{ getTime(timeNow) }</div>
            <hr />
            <div>{ props.JSON.hourly.summary }</div>
        </div>;
};

export default WeatherNow;
