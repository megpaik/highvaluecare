'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchMatch = exports.returnMatches = exports.mainReducer = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _initialState = require('../initialState.js');

var initialState = _interopRequireWildcard(_initialState);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CIS 197 - React HW

var mainReducer = function mainReducer(state, action) {
  switch (action.type) {
    case 'ClICK_RIGHT':
      {
        var scroll = state.scroll;
        scroll = scroll < state.basket.length - 3 ? (scroll + 1) % state.basket.length : scroll;
        return _lodash2.default.assign({}, state, { scroll: scroll });
      }
    case 'ClICK_LEFT':
      {
        var _scroll = state.scroll;
        _scroll = _scroll > 0 ? (state.scroll - 1 + state.basket.length) % state.basket.length : _scroll;
        return _lodash2.default.assign({}, state, { scroll: _scroll });
      }
    case 'CLEAR':
      return _lodash2.default.assign({}, state, { basket: [], scroll: 0 });

    case 'SEARCH':
      return _lodash2.default.assign({}, state, { matches: returnMatches(query) });

    case 'CHOOSE':
      {
        var basket = state.basket;
        basket.unshift(action.query);
        return _lodash2.default.assign({}, state, { basket: basket });
      }
    case 'DELETE':
      {
        var _basket = state.basket;
        var idx = _basket.indexOf(action.query);
        var _scroll2 = state.scroll;
        if (idx != -1) {
          _basket.splice(idx, 1);
          if (_scroll2 + 3 > _basket.length && _scroll2 > 0) {
            _scroll2--;
          }
        }
        return _lodash2.default.assign({}, state, { basket: _basket, scroll: _scroll2 });
      }
    case 'SEARCH_VIEW':
      return _lodash2.default.assign({}, state, { searchString: action.query });
  }
  return state;
};

// Helper 1 - Looks for all matching studies
var returnMatches = function returnMatches(keyword) {
  var matches = [];
  for (s in studies) {
    if (searchMatch(keyword, studies[s])) {
      matches.push(s);
    }
  }
  return matches;
};

// Helper 1b - Does this study match the keyword?
var searchMatch = function searchMatch(keyword, study) {
  return study.CPT.indexOf(keyword) >= 0 || study.name.indexOf(keyword) >= 0 || study["Intended Diagnosis"].indexOf(keyword) >= 0 || study.Tags.indexOf(keyword) >= 0;
};

exports.mainReducer = mainReducer;
exports.returnMatches = returnMatches;
exports.searchMatch = searchMatch;