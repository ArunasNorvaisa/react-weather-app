import React from 'react';

function Header(props) {

  const [searchTerm, setSearchTerm] = React.useState(null);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.handleAddressSearch(searchTerm);
  };

  return <header>
    <div>Latitude: {props.latitude.toFixed(4)}</div>
    <div>Longitude: {props.longitude.toFixed(4)}</div>
    <div>Address: {props.address}</div>
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="city_search"
          placeholder={props.city}
          onChange={handleInputChange}
        />
        <i className="fas fa-search fa-2x" />
        <button type="submit" />
      </form>
    </div>
  </header>;
}

export default Header;
