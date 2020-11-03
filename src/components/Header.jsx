import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from './Store';

export default function Header(props) {

  const [globalStore] = useContext(GlobalStoreContext);
  const [searchText, setSearchText] = useState('');

  const handleInputChange = event => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.handleAddressSearch(searchText);
    setSearchText('');
  };

  return (
    <header>
      <div>Latitude: {globalStore.latitude.toFixed(4)}</div>
      <div>Longitude: {globalStore.longitude.toFixed(4)}</div>
      <div>Address: {globalStore.address}</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="city_search"
            placeholder={globalStore.city}
            value={searchText}
            onChange={handleInputChange}
          />
          <img src={require('../static/images/icons/search.svg')} alt="search icon" />
          <button type="submit" />
        </form>
      </div>
    </header>
  );
}
