var medicalStudies4 = require('./data/medicalStudies4.json');
// var medicalStudies4 = {};
// Helper 1 - cleans JSON and returns an object with all the studies (entries)
// Renames all the studies by name_diagnosis
var clean = function (obj) {
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
}

// Helper 2 - alphabetizes properties of studies by removing and adding them
var alphabetize = function(studies, expected) {
  var keys = Object.keys(studies).sort(function keyOrder(k1, k2) {
      if (studies[k1].name.toLowerCase() < studies[k2].name.toLowerCase()) return -1;
      else if (studies[k1].name.toLowerCase() > studies[k2].name.toLowerCase()) return +1;
      else return 0;
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
}

const studies = alphabetize(clean(medicalStudies4));
const matches = [];
const basket = [];
const scroll = 0;
const query = '';
// LANDING, DIRECTORY, SEARCH, COMPARE
const active = 'LANDING';

export { studies, matches, basket, scroll, query, active };
