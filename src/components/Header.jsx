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
    handleAddressSearch(searchText);
    setSearchText('');
  };

  return (
    <header>
      <div>Latitude: {globalState.latitude.toFixed(4)}</div>
      <div>Longitude: {globalState.longitude.toFixed(4)}</div>
      <div>Address: {globalState.address}</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="city_search"
            placeholder={globalState.city}
            value={searchText}
            onChange={handleInputChange}
          />
          <img src="/images/icons/search.svg" alt="search icon" />
          <button type="submit" />
        </form>
      </div>
    </header>
  );
}
