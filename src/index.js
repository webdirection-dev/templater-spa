import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from './store'

import App from "./components/app";

import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
