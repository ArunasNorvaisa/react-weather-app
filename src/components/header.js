import React from 'react';

const Header = (props) => {
    return <header>
            <div className="coords">Latitude: {props.lat}</div>
            <div className="coords">Longitude: {props.lng}</div>
            <div className="form">
                <form>
                    <label htmlFor="city_search">Search city</label>
                    <input id="city_search" value={props.city} />
                    <button>Submit</button>
                </form>
            </div>
        </header>
}
 
export default Header;
