import React, { Component } from 'react';
import Header from './header';
import Map from './map';

const WEATHER_URL_HOME = 'https://api.myjson.com/bins/lpb96';
const IP_URL_HOME = 'http://ip-api.com/json';
//const WEATHER_URL_HOME = 'https://api.wunderground.com/api/6b256b790612d6d5/forecast/conditions/q/autoip.json';

class App extends Component {
constructor(props) {
super(props);

    this.state = {
      isLoaded: false,
      IP: null,
      lat: 0,
      lng: 0,
      city: 'Not known'
    };
}

getIP = () => {
  fetch(IP_URL_HOME, {method:'GET'})
  .then(response => response.json())
  .then(json => {
      this.setState({
        isLoaded: true,
        IP: json.query,
        lat: json.lat,
        lng: json.lon,
        city: json.city
      });
      console.log(this.state);
  });
}

/* getInitialWeather = () => {
  fetch(WEATHER_URL_HOME, {method:'GET'})
  .then(response => response.json())
  .then(json => {
      this.setState({
        isLoaded: true,
        lat: json.current_observation.observation_location.latitude,
        lng: json.current_observation.observation_location.longitude,
        city: json.current_observation.observation_location.city,
        cityState: json.current_observation.display_location.full
      });
  });
} */

  componentDidMount() {
  //static getDerivedStateFromProps() {
    this.setState({ isLoaded: true })
    this.getIP();
};

render() {
  if (this.state.IP) {
return <div className="wrapper">
<Map lat={this.state.lat}
     lng={this.state.lng}
     city={this.state.city}
  />
  </div>} else {
    return <h1>Application is loading, please be patient...</h1>;
  }
}
}

export default App;
