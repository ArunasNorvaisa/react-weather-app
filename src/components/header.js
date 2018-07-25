import React from 'react';

const Header = (props) => {
    return <header>
            <div className="coords">Latitude: { props.lat.toFixed(4) }</div>
            <div className="coords">Longitude: { props.lng.toFixed(4) }</div>
            <div className="coords">Address: { props.city }</div>
            <div className="form">
                <form>
                    <input id="city_search" value={ props.city } />
                    <button>Submit</button>
                </form>
            </div>
        </header>
}
 
export default Header;
