import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: null }
    }

    handleInputChange = event => {
        this.setState({ searchTerm: event.target.value });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.props.handleAddressSearch(this.state.searchTerm);
    };

    render() {
        return <header>
            <div className="coords">Latitude: { this.props.latitude.toFixed(4) }</div>
            <div className="coords">Longitude: { this.props.longitude.toFixed(4) }</div>
            <div className="coords">Address: { this.props.address }</div>
            <div>
                <form onSubmit={ this.handleFormSubmit }>
                    <input type="text" id="city_search" placeholder={ this.props.city } onChange={ this.handleInputChange } />
                    <button type="submit">
                        <img src="./images/icons/search.svg" width={`21px`} alt="search_weather" />
                    </button>
                </form>
            </div>
        </header>
    }
};

export default Header;
