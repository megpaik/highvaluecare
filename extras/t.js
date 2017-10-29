var fs = require('fs');

fs.readFile('./data/medicalStudies4.json', 'utf8', function (err, data) {
  var jsonEscape = function (str) {
    return str.replace(/\r?\n|\r/g, "").replace(/^\uFEFF/, '');
  }

  var obj = JSON.parse(jsonEscape(data));
  var count = 0;
  for (k in obj) {
    if (obj[k].Cost != null) count++;
  }

  console.log(count);
});
