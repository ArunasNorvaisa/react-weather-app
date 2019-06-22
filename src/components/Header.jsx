import React, { useContext } from 'react';
import { GlobalStoreContext } from "./Store";

function Header(props) {

  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);

  const handleInputChange = event => {
    setGlobalStore({...globalStore, searchTerm: event.target.value});
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.handleAddressSearch(globalStore.searchTerm);
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
            placeholder={props.city}
            onChange={handleInputChange}
          />
          <i className="fas fa-search fa-2x" />
          <button type="submit" />
        </form>
      </div>
    </header>
  );
}

export default Header;
