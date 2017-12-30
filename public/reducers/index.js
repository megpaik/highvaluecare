import _ from 'lodash';
import * as initialState from '../initialState.js';

const mainReducer = (state, action) => {
  switch (action.type) {
  case 'CLICK_RIGHT': {
    let scroll = state.scroll;
    scroll = (scroll < state.basket.length - 3) ?
              (scroll + 1) % state.basket.length
              : scroll;
    return _.assign({}, state, {scroll: scroll});
  }
  
  case 'CLICK_LEFT': {
    let scroll = state.scroll;
    scroll = (scroll > 0) ?
              (state.scroll - 1 + state.basket.length) % state.basket.length
              : scroll;
    return _.assign({}, state, {scroll: scroll});
  }

  case 'CLEAR':
    return _.assign({}, state, {basket: [], scroll: 0});

  case 'SEARCH':
    return _.assign({}, state, {matches: returnMatches(action.query, state), active: 'SEARCH'});

  case 'CHOOSE': {
    let basket = state.basket;
    basket.unshift(action.query);
    return _.assign({}, state, {basket: basket});
  }

  case 'DELETE': {
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
  }

  case 'SEARCH_VIEW':
    return _.assign({}, state, {query: action.query})

  case 'NAV_DIRECTORY':
    return _.assign({}, state, {active: 'DIRECTORY'});

  case 'NAV_LANDING':
    return _.assign({}, state, {active: 'LANDING'});
  
  case 'NAV_COMPARE':
    return _.assign({}, state, {active: 'COMPARE'});
  
  case 'NAV_SEARCH':
    return _.assign({}, state, {active: 'SEARCH'});
  }

  return state;
};

// Helper 1 - Looks for all matching studies
const returnMatches = function (keyword, state) {
  let matches = []
  for (var s in state.studies) {
    if (searchMatch(keyword, state.studies[s])) {
      matches.push(state.studies[s]);
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
