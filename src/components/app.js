import React, { Component } from 'react';
import Map from './map';

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
    const IP_URL_HOME = 'http://ip-api.com/json';
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
    });
  }

  componentDidMount() {
    this.getIP();
  };

render() {
  if (this.state.isLoaded) {
    return <div className="wrapper">
      <Map lat={ this.state.lat }
           lng={ this.state.lng }
           city={ this.state.city }
        />
      </div>} else {
    return <h1>Application is loading, please be patient...</h1>;
  }
}
}

export default App;
