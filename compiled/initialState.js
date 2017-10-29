'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchString = exports.scroll = exports.basket = exports.matches = exports.studies = undefined;

var _medicalStudies = require('./data/medicalStudies4');

var medicalStudies4 = _interopRequireWildcard(_medicalStudies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var studies = alphabetize(clean(medicalStudies4));
var matches = [];
var basket = [];
var scroll = 0;
var searchString = '';

// Helper 1 - cleans JSON and returns an object with all the studies (entries)
// Renames all the studies by name_diagnosis
var clean = function clean(obj) {
  var modifiedEntries = {};

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var modifiedEntry = obj[prop];
      var lowerName = prop.toLowerCase();
      var lowerDiag = modifiedEntry['Intended Diagnosis'].toLowerCase();
      var uniqueID = lowerName + '_' + lowerDiag;
      modifiedEntry.lowerName = lowerName;
      modifiedEntry.lowerDiag = lowerDiag;
      modifiedEntry.ID = uniqueID;

      //modifiedEntries[uniqueID] = modifiedEntry;
      modifiedEntries[prop] = modifiedEntry;
    }
  }
  return modifiedEntries;
};

// Helper 2 - alphabetizes properties of studies by removing and adding them
var alphabetize = function alphabetize(studies, expected) {
  var keys = Object.keys(studies).sort(function keyOrder(k1, k2) {
    if (studies[k1].name.toLowerCase() < studies[k2].name.toLowerCase()) return -1;else if (studies[k1].name.toLowerCase() > studies[k2].name.toLowerCase()) return +1;else return 0;
  });

  var holder = {};
  for (var i = 0; i < keys.length; i++) {
    holder[keys[i]] = studies[keys[i]];
    delete studies[keys[i]];
  }

  for (i = 0; i < keys.length; i++) {
    studies[keys[i]] = holder[keys[i]];
  }
  return studies;
};

exports.studies = studies;
exports.matches = matches;
exports.basket = basket;
exports.scroll = scroll;
exports.searchString = searchString;