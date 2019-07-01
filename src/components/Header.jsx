import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from './Store';

function Header(props) {

  const [globalStore] = useContext(GlobalStoreContext);
  const [searchText, setSearchText] = useState(globalStore.city);

  const handleInputChange = event => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.handleAddressSearch(searchText);
  };

  return (
    <header>
      <div>Latitude: {globalStore.latitude.toFixed(4)}</div>
      <div>Longitude: {globalStore.longitude.toFixed(4)}</div>
      <div>Address: {globalStore.address}</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type='text'
            id='city_search'
            placeholder={globalStore.city}
            onChange={handleInputChange}
          />
          <img src='./images/icons/search.png' alt='search icon' />
          <button type='submit' />
        </form>
      </div>
    </header>
  );
}

export default Header;
