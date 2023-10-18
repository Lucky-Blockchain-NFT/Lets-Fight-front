import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './Routes/App'
import { Buffer } from 'buffer';

import { store } from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

window.Buffer = Buffer;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
