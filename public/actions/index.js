// Fired by Basket
const clickRight = function () {
  return {type: 'CLICK_RIGHT'};
};

// Fired by Basket
const clickLeft = function () {
  return {type: 'CLICK_LEFT'};
};

// Fired by Search
const search = function (searchString) {
  return {type: 'SEARCH', query: searchString};
};

// Fired by Search
const searchView = function (str) {
  return {type: 'SEARCH_VIEW', query: str}
};

// Fired by SingleResult
const choose = function (id) {
  return {type: 'CHOOSE', query: Number(id)};
};

// Fired by BasketElm
const deleteElm = function (id) {
  return {type: 'DELETE', query: Number(id)};
};

// Fired by Basket
const clear = function () {
  return {type: 'CLEAR'};
};

export { clickRight, clickLeft, search, searchView, choose, deleteElm, clear };
