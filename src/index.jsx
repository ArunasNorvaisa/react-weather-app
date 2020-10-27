import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './components/Store';

function Index() {
  return (
    <Store>
      <App />
    </Store>
  );
}

ReactDOM.render(<Index />, document.getElementById('app'));
