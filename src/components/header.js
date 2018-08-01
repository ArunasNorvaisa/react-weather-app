import React from 'react';

const Header = (props) => {
    return <header>
            <div className="coords">Latitude: { props.latitude.toFixed(4) }</div>
            <div className="coords">Longitude: { props.longitude.toFixed(4) }</div>
            <div className="coords">Address: { props.address }</div>
            <div className="form">
                <form>
                    <input id="city_search" placeholder={ props.city } />
                    <button><img src="./images/icons/search.svg" width={`21px`} /> </button>
                </form>
            </div>
        </header>
}

export default Header;
