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

// Fired by LandingPage
const navDirectory = function () {
  return {type: 'NAV_DIRECTORY'};
};

const navLanding = () => {
  return {type: 'NAV_LANDING'};
}

const navCompare = () => {
  return {type: 'NAV_COMPARE'};
}

const navSearch = () => {
  return {type: 'NAV_SEARCH'};
}
export { clickRight, clickLeft, search, searchView, choose, deleteElm, clear, navDirectory, navLanding, navCompare, navSearch };
