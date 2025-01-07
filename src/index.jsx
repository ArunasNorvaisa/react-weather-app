import { createRoot } from 'react-dom/client';
import App from './components/App';
import GlobalStoreProvider from './components/Store';

createRoot(document.getElementById('app')).render(
  <GlobalStoreProvider>
    <App />
  </GlobalStoreProvider>
);
