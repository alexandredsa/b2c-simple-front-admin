import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import store from './store';
import Routes from './routes';

window.store = store;

render(
    <Provider store={store}><Routes /></Provider>
    , document.getElementById("root"));

serviceWorker.unregister();
