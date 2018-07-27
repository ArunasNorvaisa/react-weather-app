import React, { Component } from 'react';
import Map from './map';

const IP_URL_HOME = 'http://ip-api.com/json';

class App extends Component {
constructor(props) {
super(props);

    this.state = {
      isLoaded: false,
      IP: null,
      lat: 0,
      lng: 0,
      address: 'Not known'
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
        address: json.city
      });
  });
}

  componentDidMount() {
    this.getIP();
  };

render() {
  if (this.state.IP) {
    return <div className="wrapper">
      <Map lat={ this.state.lat }
          lng={ this.state.lng }
          address={ this.state.address }
        />
      </div>} else {
    return <h1>Application is loading, please be patient...</h1>;
  }
}
}

export default App;
