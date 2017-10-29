'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reducers = require('./reducers');

var _SearchBar = require('./components/SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _SearchResult = require('./components/SearchResult');

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _Basket = require('./components/Basket');

var _Basket2 = _interopRequireDefault(_Basket);

var _initialState = require('./initialState');

var initialState = _interopRequireWildcard(_initialState);

var _index = require('./actions/index');

var actions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers.mainReducer, initialState);

var searchPage = _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_SearchBar2.default, { store: store }),
  _react2.default.createElement(_SearchResult2.default, { store: store }),
  _react2.default.createElement(_Basket2.default, { store: store })
);

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(searchPage, document.getElementById('container'));
});