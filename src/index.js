import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";

import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
