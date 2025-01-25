import { useContext, useState } from 'react';
import { GlobalStoreContext } from './Store';

export default function Header({ handleAddressSearch }) {
  const { globalState } = useContext(GlobalStoreContext);
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleAddressSearch(searchText.trim()); // Trim the input value
    setSearchText('');
  };

  const { latitude, longitude, address, city } = globalState;

  return (
    <header>
      <div>Latitude: {latitude.toFixed(4)}</div>
      <div>Longitude: {longitude.toFixed(4)}</div>
      <div>Address: {address}</div>
      <div>
        <form onSubmit={handleFormSubmit} aria-label="Search by address">
          <input
            type="text"
            id="city_search"
            placeholder={city}
            value={searchText}
            onChange={handleInputChange}
            aria-label="Enter address to search"
          />
          <img src="/images/icons/search.svg" alt="search icon" />
          <button type="submit" aria-label="Submit search" />
        </form>
      </div>
    </header>
  );
}
