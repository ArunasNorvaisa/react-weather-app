import React from 'react';
import ReactWeather from "react-open-weather";
import "react-open-weather/lib/css/ReactWeather.css";

const Weather = (props) => {
    return <ReactWeather
        forecast="5days"  
        apikey="0dde434f020b43b6adf152044182507"
        type="geo"
        lat={ props.latitude.toString() }
        lon={ props.longitude.toString() }
    />;
}
 
export default Weather;
