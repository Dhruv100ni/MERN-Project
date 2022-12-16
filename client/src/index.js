import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import App from './App';
import './index.css';

const store = configureStore({ reducer: reducers });

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root'),
// );

//createRoot is a new feature in React 17
//use createRoot 
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>

        <App />
    </Provider>
);



