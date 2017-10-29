// CIS 197 - React HW

import _ from 'lodash';
import * as initialState from '../initialState.js';

const mainReducer = (state, action) => {
  switch (action.type) {
  case 'ClICK_RIGHT':
    let scroll = state.scroll;
    scroll = (scroll < state.basket.length - 3) ?
              (scroll + 1) % state.basket.length
              : scroll;
    return _.assign({}, state, {scroll: scroll});

  case 'ClICK_LEFT':
    let scroll = state.scroll;
    scroll = (scroll > 0) ?
              (state.scroll - 1 + state.basket.length) % state.basket.length
              : scroll;
    return _.assign({}, state, {scroll: scroll});

  case 'CLEAR':
    return _.assign({}, state, {basket: [], scroll: 0});

  case 'SEARCH':
    return _.assign({}, state, {matches: returnMatches(query)});

  case 'CHOOSE':
    let basket = state.basket;
    basket.unshift(action.query);
    return _.assign({}, state, {basket: basket});

  case 'DELETE':
    let basket = state.basket;
    let idx = basket.indexOf(action.query);
    let scroll = state.scroll;
    if (idx != -1) {
      basket.splice(idx, 1);
      if (scroll + 3 > basket.length && scroll > 0) {
        scroll--;
      }
    }
    return _.assign({}, state, {basket: basket, scroll: scroll});

  case 'SEARCH_VIEW':
    return _.assign({}, state, {searchString: action.query})
  }
  return state;
};

// Helper 1 - Looks for all matching studies
const returnMatches = function (keyword) {
  let matches = []
  for (s in studies) {
    if (searchMatch(keyword, studies[s])) {
      matches.push(s);
    }
  }
  return matches;
}

// Helper 1b - Does this study match the keyword?
const searchMatch = function (keyword, study) {
  return (study.CPT.indexOf(keyword) >= 0 ||
          study.name.indexOf(keyword) >= 0 ||
          study["Intended Diagnosis"].indexOf(keyword) >= 0 ||
          study.Tags.indexOf(keyword) >= 0);
}

export { mainReducer, returnMatches, searchMatch };
