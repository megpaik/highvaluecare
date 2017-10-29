import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import SearchBar from './components/SearchBar';
import Listing from './components/Listing';
import Basket from './components/Basket';
import * as initialState from './initialState';
import * as actions from './actions/index';

const store = createStore(reducers, initialState);

let searchPage = (<div>
                    <SearchBar store={store}/>
                    <Listing store={store}/>
                    <Basket store={store}/>
                  </div>);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    searchPage,
    document.getElementById('container')
  );
});
