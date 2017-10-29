import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import searchBar from './components/SearchBar';
import listing from './components/Listing';
import basket from './components/Basket';
import * as initialState from './initialState';
import * as actions from './actions/index';

const store = createStore(reducers, initialState);
timer.setStore(store);

const gameOfLife = <GameOfLife store={store}/>;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    gameOfLife,
    document.getElementById('container')
  );
});
