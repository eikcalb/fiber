import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ToastProvider } from 'react-toast-notifications'
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router >
        <ToastProvider placement='bottom-right' transitionDuration={250} >
            <App />
        </ToastProvider>
    </Router>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();