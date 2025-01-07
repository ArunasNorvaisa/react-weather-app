import { SpinnerRoundOutlined } from 'spinners-react';
import Error from './Error';
import Map from './Map';
import Header from './Header';
import Weather from './Weather';
import useApp from '../hooks/useApp.js';
import '../css/style.scss';

export default function App() {
  const { globalState, handleAddressSearch, handleMapClick } = useApp();

  if (globalState.error) {
    return (
      <div className="loadingDiv">
        <Error message={globalState.error ? globalState.error.message : 'SOMETHING WRONG HAPPENED'} />
      </div>
    );
  }

  if (!globalState.isAppLoaded)
    return (
      <div className="loadingDiv">
        <SpinnerRoundOutlined size={88} thickness={100} speed={134} color="rgba(172, 57, 128, 1)" />
      </div>
    );

  return (
    <>
      <Header handleAddressSearch={handleAddressSearch} />
      <Weather />
      <Map handleMapClick={handleMapClick} />
    </>
  );
}
