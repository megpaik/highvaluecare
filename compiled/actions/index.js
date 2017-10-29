'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Fired by Basket
var clickRight = function clickRight() {
  return { type: 'ClICK_RIGHT' };
};

// Fired by Bakset
var clickLeft = function clickLeft() {
  return { type: 'ClICK_LEFT' };
};

// Fired by Search
var search = function search(searchString) {
  return { type: 'SEARCH', query: searchString };
};

// Fired by Search
var searchView = function searchView(str) {
  return { type: 'SEARCH_VIEW', query: str };
};

// Fired by SingleResult
var choose = function choose(id) {
  return { type: 'CHOOSE', query: Number(id) };
};

// Fired by BasketElm
var deleteElm = function deleteElm(id) {
  return { type: 'DELETE', query: Number(id) };
};

// Fired by Basket
var clear = function clear() {
  return { type: 'CLEAR' };
};

exports.clickRight = clickRight;
exports.clickLeft = clickLeft;
exports.search = search;
exports.searchView = searchView;
exports.choose = choose;
exports.deleteElm = deleteElm;
exports.clear = clear;