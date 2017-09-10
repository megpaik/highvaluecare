var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var buffer2write = {};

// what to do when we visit '/scrape'
app.get('/scrape', (req, res) => {

  // first, request, then if goes well, scrape with it
  var promise1 = test1()
  .then((fulfilVal) => { scrapePrice(fulfilVal.html, fulfilVal.hostName) })
  .catch(error => console.log(error));

  var promise2 = test2()
  .then((fulfilVal) => { scrapePrice(fulfilVal.html, fulfilVal.hostName) })
  .catch(error => console.log(error));

  var promise3 = test3()
  .then((fulfilVal) => { scrapePrice(fulfilVal.html, fulfilVal.hostName) })
  .catch(error => console.log(error));

  Promise.all([promise1, promise2, promise3])
  .then(() => {
    // finish by writing the file
    fs.writeFile('output.json', JSON.stringify(buffer2write, null, 4), function(err){
      console.log('File  written!');
    })

    // finally, we'll just send out a message to the browser
    res.send('Check your console!')
  })
});

// run our tests: resolve = func(html, hostName); reject = func(error)
// test 1
function test1() {
  return new Promise( function(resolve, reject) {
    var testURL1 = 'https://healthcarebluebook.com/page_ProcedureDetails.aspx?cftId=390&g=Abdomen+and+Pelvis+CT+(no+contrast)';
    request(testURL1, (error, response, html) => {
      if (error) reject(error);
      else {
        var fulfilVal = {html: html, hostName : 'HCBB'}
        resolve(fulfilVal);
      }
    })
  })
}

// test 2
function test2() {
  return new Promise(function(resolve, reject) {
    var testURL2 = 'https://clearhealthcosts.com/blog/procedure/ct-scan-pelvis-without-contrast/';
    request(testURL2, (error, response, html) => {
      if (error) reject(error);
      else {
        var fulfilVal = {html: html, hostName : 'CH'}
        resolve(fulfilVal);
      }
    });
  })
}

// test 3
function test3() {
  return new Promise(function(resolve, reject) {
    var testURL3 = 'https://www.newchoicehealth.com/places/pennsylvania/philadelphia/ct-scan/ct-angiography-abdomen';
    request(testURL3, (error, response, html) => {
      if (error) reject(error);
      else {
        var fulfilVal = {html: html, hostName : 'NCH'}
        resolve(fulfilVal);
      }
    });
  })
}

// scrape a website (generic)
var scrapePrice = function(html, hostName) {
  var $ = cheerio.load(html);
  switch (hostName) {
    case "HCBB":
    HCBBreq($);
    break;
    case "CH":
    CHreq($);
    break;
    case "FH":
    FHreq($);
    break;
    case "NCH":
    NCHreq($);
  }
}

// HealthCareBlueBook helper (specific to their HTML)
HCBBreq = function($) {
  var price = -1;
  // get els with matching tag, and run a function on them?
  $('.arrow-box').each(function(i, elem){
    var text = $(this).children().first().text();
    price = parseInt(text.replace(/\D/g,''));
  })
  buffer2write.HCBBprice = price;
}

// ClearHealth helper (specific to their HTML)
var CHreq = function($) {
  var prices = [];
  $('.price-badge.price-charged').each(function(i, elem){
    var text = $(this).children().last().text();
    prices.push(parseInt(text.replace(/\D/g,'')));
  })
  prices.sort();
  buffer2write.CHprice = prices[Math.floor(prices.length / 2)];
}

// FairHealth helper (specific to their HTML)
var FHreq = function($) {
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
  buffer2write.FHprice = priceInsured;
}

// NewChoiceHealth helper (specific to their HTML)
var NCHreq = function($) {
  var price = -1;
  $('.pull-left.cost.average').each(function(i, elem){
    var text = $(this).text();
    console.log(text);
    price = parseInt(text.replace(/\D/g,''));
  })
  buffer2write.NCHprice = price;
}

app.listen('8081');
console.log('The magic happens on port 8081');
// exports = module.exports = app;
