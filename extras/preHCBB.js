/* Gets HCBB URLs and saves them to hcbburls.json */

var express     = require('express');
var app         = express();
var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');
var path        = require("path");

var genHCBB = function (cpt) {
  return new Promise((resolve, reject) => {
    var initUrl = "https://healthcarebluebook.com/page_SearchResults.aspx?SearchTerms=" + cpt;
    request(initUrl, function (error, response, html) {
      var $ = cheerio.load(html);
      if ($('#cphDefaultMaster_lblResultLeft').find('.physician').length == 0 &&
          $('#cphDefaultMaster_lblResultLeft').find('.labs').length == 0) {
        resolve({cpt: cpt, url: '', hostName: 'HCBB'});
      } else {
        var href = $('#cphDefaultMaster_lblResultLeft').find('.service-name').children().attr('href');
        var suffix = href.slice(href.indexOf('?'));
        var url = "https://healthcarebluebook.com/page_ProcedureDetails.aspx" + suffix;
        resolve({cpt: cpt, url: url, hostName: 'HCBB'});
      }
    });
  });
}

fs.readFile('./data/cpts.csv', 'utf8', function (err, data) {
  var ids = data.split(/\r|\n/);
  var urls = [];

  for (idx in ids) {
    urls[idx] = genHCBB (ids[idx]);
  }

  Promise.all(urls).then(function (urlArr) {
    var urlObj = {}
    for (idx in urlArr) {
      var el = urlArr[idx];
      if (el.url != "") urlObj[el.cpt] = el;
    }

    fs.writeFile('./data/hcbburls.json', JSON.stringify(urlObj), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });
});
