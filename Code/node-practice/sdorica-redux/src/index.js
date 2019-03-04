import React from 'react';
import App from './app';
import ReactDom from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));