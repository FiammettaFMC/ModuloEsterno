import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ViewModel from './ViewModel';

ReactDOM.render(
  <React.StrictMode><ViewModel /></React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
