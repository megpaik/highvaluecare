// Fired by Basket
const clickRight = function () {
  return {type: 'ClICK_RIGHT'};
};

// Fired by Bakset
const clickLeft = function () {
  return {type: 'ClICK_LEFT'};
};

// Fired by Search
const search = function (searchString) {
  return {type: 'SEARCH', query: searchString};
};

// Fired by SingleResult
const choose = function (id) {
  return {type: 'CHOOSE', query: Number(id)};
};

// Fired by BasketElm
const delete = function (id) {
  return {type: 'DELETE', query: Number(id)};
};

// Fired by Basket
const clear = function () {
  return {type: 'CLEAR'};
};

export { clickRight, clickLeft, search, choose, delete, clear };
