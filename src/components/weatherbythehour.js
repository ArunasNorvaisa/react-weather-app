import React from 'react';
import HourlyWeatherItem from './hourlyweatheritem';

const WeatherByTheHour = props => {

    const items = props.JSON.hourly.data.map((item) => {
        return (
            <HourlyWeatherItem
                key={ item.time }
                item={ item }
                JSON={ props.JSON }
                isTemperatureInC={ props.isTemperatureInC }
            />
        );
    });
    return <div className="weatherByTheHour">{ items }</div>;
}

export default WeatherByTheHour;
