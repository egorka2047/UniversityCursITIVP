import React, {createContext, useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
const cors = require('cors')

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore(),
    }}>
    <App />
    </Context.Provider>,
    document.getElementById('root')
);


