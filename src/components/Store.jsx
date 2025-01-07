import { createContext, useContext, useState } from 'react';

const initialState = {
  tInC: true,
  isAppLoaded: false,
  latitude: 0,
  longitude: 0,
  city: '',
  address: '',
  error: null,
  jsonData: {}
};

export const GlobalStoreContext = createContext(null);

export const useGlobalStore = () => {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return context;
};

function GlobalStoreProvider({ children }) {
  const [globalState, setGlobalState] = useState(initialState);

  const setAppLoaded = (isAppLoaded) => setGlobalState((prev) => ({ ...prev, isAppLoaded }));
  const setError = (error) => setGlobalState((prev) => ({ ...prev, error }));
  const resetStore = () => setGlobalState(initialState);

  const value = {
    globalState,
    setError,
    setAppLoaded,
    resetStore,
    setGlobalState
  };

  return <GlobalStoreContext.Provider value={value}>{children}</GlobalStoreContext.Provider>;
}

export default GlobalStoreProvider;
