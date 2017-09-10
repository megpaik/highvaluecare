var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var costs = {};

/* ---------------------------------------------- */
/*                  HELPER FUNCTIONS              */
/* ---------------------------------------------- */

// generic request (get HTML) then fulfill.
var prescrape = function(url, hostName, studyName) {
  return new Promise(function(resolve, reject) {
    request(url, (error, response, html) => {
      if (error) reject(error);
      else {
        var fulfilVal = {html: html, hostName : hostName, studyName : studyName}
        resolve(fulfilVal);
      }
    });
  })
}

// generic fulfill (scrape) after request
var scrape = function(url, hostName, studyName) {
  var promise = prescrape(url, hostName, studyName)
  .then((fulfilVal) => { loadAndDelegate(fulfilVal.html, fulfilVal.hostName, fulfilVal.studyName) })
  .catch(error => console.log(error));
  return promise;
}

// scrape a website (generic)
var loadAndDelegate = function(html, hostName, studyName) {
  var $ = cheerio.load(html);
  switch (hostName) {
    case "HCBB":
    HCBBreq($, studyName);
    break;
    case "CH":
    CHreq($, studyName);
    break;
    case "FH":
    FHreq($, studyName);
    break;
    case "NCH":
    NCHreq($, studyName);
  }
}

// HealthCareBlueBook helper (specific to their HTML)
var HCBBreq = function($, studyName) {
  var price = -1;
  // get els with matching tag, and run a function on them?
  $('.arrow-box').each(function(i, elem){
    var text = $(this).children().first().text();
    price = parseInt(text.replace(/\D/g,''));
  })
  costs[studyName] = price;
}

// ClearHealth helper (specific to their HTML)
var CHreq = function($, studyName) {
  var prices = [];
  $('.price-badge.price-charged').each(function(i, elem){
    var text = $(this).children().last().text();
    prices.push(parseInt(text.replace(/\D/g,'')));
  })
  prices.sort();
  costs[studyName] = prices[Math.floor(prices.length / 2)];
}

// FairHealth helper (specific to their HTML)
var FHreq = function($, studyName) {
  var priceInsured = -1;
  var priceUninsured = -1;
  $('.circle out-net-summary').each(function(i, elem){
    var textUninsured = $(this).text();
    priceUninsured = parseInt(textUninsured.replace(/\D/g,''));
  })
  $('.circle in-net-summary small').forEach(function(){
    var textInsured = $(this).text();
    priceInsured = parseInt(textInsured.replace(/\D/g,''));
  })

  // TO-DO: make a decision about price somehow
  costs[studyName] = priceUninsured;
}

// NewChoiceHealth helper (specific to their HTML)
var NCHreq = function($, studyName) {
  var price = -1;
  $('.pull-left.cost.average').each(function(i, elem){
    var text = $(this).text();
    price = parseInt(text.replace(/\D/g,''));
  })
  costs[studyName] = price;
}

// Given an object of many (studyName, url, hostName)s, update costs
function scrapeThemAll(arrOfStudyObjects) {
  allPromises = []
  for (var i = 0; i < arrOfStudyObjects.length; i++) {
    study = arrOfStudyObjects[i];
    allPromises[i] = scrape(study.url, study.hostName, study.studyName)
  }

  Promise.all(allPromises)
  .then(() => {
    // finish by writing the file
    fs.writeFile('output.json', JSON.stringify(costs, null, 4), (err) => {
      console.log('File  written!');
    })
  })
}





/* ---------------------------------------------- */
/*                    MAIN BODY                   */
/* ---------------------------------------------- */

// what to do when we visit '/scrape'
app.get('/scrape', (req, res) => {
// tests x3
var testURL1 = 'https://healthcarebluebook.com/page_ProcedureDetails.aspx?cftId=390&g=Abdomen+and+Pelvis+CT+(no+contrast)';
var testURL2 = 'https://clearhealthcosts.com/blog/procedure/ct-scan-pelvis-without-contrast/';
var testURL3 = 'https://www.newchoicehealth.com/places/pennsylvania/philadelphia/ct-scan/ct-angiography-abdomen';

var testObj1 = {studyName : 'testHCBB', url : testURL1, hostName : 'HCBB'};
var testObj2 = {studyName : 'testCH', url : testURL2, hostName : 'CH'};
var testObj3 = {studyName : 'testNCH', url : testURL3, hostName : 'NCH'};

scrapeThemAll([testObj1, testObj2, testObj3]);
// finally, we'll just send out a message to the browser
res.send('Check your console!')
});


app.listen('8081');
console.log('The magic happens on port 8081');
// exports = module.exports = app;
