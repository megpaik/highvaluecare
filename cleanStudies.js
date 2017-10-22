/* A short script to change MedicalStudies JSON into the form specified inside
* before and after JSON.txt
* 1 - Array to named object
* 2 - Group comments and URLs */

var fs = require('fs');

fs.readFile('./data/medicalStudies.json', "utf8", function (err, data) {
  var jsonEscape = function (str) {
    return str.replace(/\r?\n|\r/g, "").replace(/^\uFEFF/, '');
  }

  var input = JSON.parse(jsonEscape(data));
  var output = []
  for (idx in input) {
    if (!input.hasOwnProperty(idx)) continue;

    var el = input[idx];
    el.comments = {};
    el.references = {};

    if (el.C1 != "") el.comments['1'] = el.C1;
    if (el.C2 != "") el.comments['2'] = el.C2;
    if (el.C3 != "") el.comments['3'] = el.C3;

    if (el.URL1 != "") el.references['1'] = el.URL1;
    if (el.URL2 != "") el.references['2'] = el.URL2;
    if (el.URL3 != "") el.references['3'] = el.URL3;

    delete el.C1;
    delete el.C2;
    delete el.C3;
    delete el.URL1;
    delete el.URL2;
    delete el.URL3;

    output.push(el);
  }

  fs.writeFile('./data/medicalStudies2.json', JSON.stringify(output), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});
