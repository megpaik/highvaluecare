var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var costs = {}
var preHCBBurls = []

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
  //.catch(error => console.log(error));
  return promise;
}

// scrape a website (generic)
var loadAndDelegate = function(html, hostName, studyName) {
  var $ = cheerio.load(html);
  switch (hostName) {
    case "HCBB":
    costs[studyName] = HCBBreq($, studyName);
    break;
    case "CH":
    costs[studyName] = CHreq($, studyName);
    break;
    case "FH":
    costs[studyName] = FHreq($, studyName);
    break;
    case "NCH":
    costs[studyName] = NCHreq($, studyName);
    break;
    case "preHCBB":
    preHCBBurls.push(preHCBBreq($, studyName));
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
  return price;
}

// ClearHealth helper (specific to their HTML)
var CHreq = function($, studyName) {
  var prices = [];
  $('.price-badge.price-charged').each(function(i, elem){
    var text = $(this).children().last().text();
    prices.push(parseInt(text.replace(/\D/g,'')));
  })
  prices.sort();
  return prices[Math.floor(prices.length / 2)];
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
  return priceUninsured;
}

// NewChoiceHealth helper (specific to their HTML)
var NCHreq = function($, studyName) {
  var price = -1;
  $('.pull-left.cost.average').each(function(i, elem){
    var text = $(this).text();
    price = parseInt(text.replace(/\D/g,''));
  })
  return price;
}

// returns URL for HCBB helper
var preHCBBreq = function($, studyName) {
  var url = $('#cphDefaultMaster_lblResultLeft').find('div.service-name').children().first().attr('href')
  return "https://healthcarebluebook.com/" + url;
}

// Given an object of many (studyName, url, hostName)s, update costs
var scrapeThemAll = function(arrOfStudyObjects) {
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
/*                  URL GENERATORS                */
/* ---------------------------------------------- */

var genHCBB = function(id) {
  var store;
  var initUrl = "https://healthcarebluebook.com/page_SearchResults.aspx?SearchTerms=" + id + "&tab=ShopForCare";
  scrape(initUrl, 'preHCBB', 'justFishing').then(function() {
    store = preHCBBurls.pop()
    return store;
  });
}

var genCH = function(id) {
  return ("https://clearhealthcosts.com/search/?query=" + id +
  "+X-ray+exam+upper+gi+tract&zip_code=19019&radius=2500&no_zero=1&submit=")
}

/* ---------------------------------------------- */
/*                  IDs TO COSTS                  */
/* ---------------------------------------------- */
// Takes in array of IDs, returns object of id : costs
var id2Costs = function(ids) {
  arrOfIDs = []
  for (var i = 0; i < ids.length; i++) {
    //var objHCBB = {studyName : ids[i], url : genHCBB(ids[i]), hostName : 'HCBB'};
    var objCH = {studyName : ids[i], url : genCH(ids[i]), hostName : 'CH'};
    //arrOfIDs.push(objHCBB)
    arrOfIDs.push(objCH)
  }
  scrapeThemAll(arrOfIDs);
  return costs;
}
/* ---------------------------------------------- */
/*                    MAIN BODY                   */
/* ---------------------------------------------- */

// what to do when we visit '/scrape'
app.get('/scrape', (req, res) => {

  var ids = [70551, 80048, 80061, 74000, 84075]
  id2Costs(ids)

  // finally, we'll just send out a message to the browser
  res.send('Check your console!')
});

app.listen('8081');
console.log('The magic happens on port 8081');
// exports = module.exports = app;
