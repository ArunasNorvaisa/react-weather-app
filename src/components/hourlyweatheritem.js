import React from 'react';

const HourlyWeatherItem = props => {
    const icon_URL = "./images/icons/" + props.item.icon + ".svg";
    let temperature;

    props.isTemperatureInC ?
        temperature = props.item.temperature.toFixed(0) :
        temperature = (props.item.temperature * 1.8 + 32).toFixed(0);

    const getTime = time => {
        const options = {
            timeZone: props.JSON.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return new Date(time * 1e3).toLocaleTimeString('en', options);
    };

    return props.item.precipType ?
        <div className="hourlyWeatherItem">
            <div>{ getTime(props.item.time) }</div>
            <div><img src={ icon_URL } alt={ props.item.icon } /></div>
            <div>{ temperature }&deg;</div>
            <div>
                { props.item.precipType } { (props.item.precipProbability * 100).toFixed(0) }%
            </div>
        </div> :
        <div className="hourlyWeatherItem">
            <div>{ getTime(props.item.time) }</div>
            <div><img src={ icon_URL } alt={ props.item.icon } /></div>
            <div>{ temperature }&deg;</div>
        </div>;
};

export default HourlyWeatherItem;
