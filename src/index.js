import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Arc from './app/index.js';

ReactDOM.render(<Arc />, document.getElementById('root'));


if (module.hot) {
  module.hot.accept();
}
