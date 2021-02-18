import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


if (window.mRoot) {
    addEventListener('MicroAppReady', startApp);
} else {
    startApp();
}


function startApp() {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
}