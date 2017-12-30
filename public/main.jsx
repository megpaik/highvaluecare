import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mainReducer as reducers } from './reducers';
import Root from './components/Root';
import * as initialState from './initialState';

const store = createStore(reducers, initialState);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('container')
  );
});