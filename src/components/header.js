import React from 'react';

const Header = (props) => {
    console.log(props);
    return <header>
            <div className="coords">Latitude: { props.latitude.toFixed(4) }</div>
            <div className="coords">Longitude: { props.longitude.toFixed(4) }</div>
            <div className="coords">Address: { props.address }</div>
            <div className="form">
                <form>
                    <input id="city_search" placeholder={ props.city } />
                    <button>Search weather</button>
                </form>
            </div>
        </header>
}
 
export default Header;
