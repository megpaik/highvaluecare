var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var buffer2write = {};

// what to do when we visit '/scrape'
app.get('/scrape', function(req, res) {

  var testURL1 = 'https://healthcarebluebook.com/page_ProcedureDetails.aspx?cftId=390&g=Abdomen+and+Pelvis+CT+(no+contrast)';
  var testURL2 = 'https://clearhealthcosts.com/blog/procedure/ct-scan-pelvis-without-contrast/';
  var testURL3 = 'https://www.newchoicehealth.com/places/pennsylvania/philadelphia/ct-scan/ct-angiography-abdomen';

  // test 1
  request(testURL1, function(error, response, html) {
    if (error) { console.log("error"); }
    scrapePrice(html, 'HCBB')

    // write the File, replace later
    fs.writeFile('output.json', JSON.stringify(buffer2write, null, 4), function(err){
      console.log('File  written!');
    })
    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')
  });

  // test 2
  request(testURL2, function(error, response, html) {
    if (error) { console.log("error"); }
    scrapePrice(html, 'CH')
    // write the File, replace later
    fs.writeFile('output.json', JSON.stringify(buffer2write, null, 4), function(err){
      console.log('File  written!');
    })
    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')
  });

  // test 3
  request(testURL3, function(error, response, html) {
    if (error) { console.log("error"); }
    scrapePrice(html, 'NCH')
    // write the File, replace later
    fs.writeFile('output.json', JSON.stringify(buffer2write, null, 4), function(err){
      console.log('File  written!');
    })
    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')
  });
});

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
var HCBBreq = function($) {
  console.log("We got to HCBBreq");
  var price = -1;
  // get els with matching tag, and run a function on them?
  $('.arrow-box').each(function(i, elem){
    var text = $(this).children().first().text();
    price = parseInt(text.replace('$', '').replace(',',''));
  })
  buffer2write.HCBBprice = price;
}

// ClearHealth helper (specific to their HTML)
var CHreq = function($) {
  console.log("We got to CHreq");
  var prices = [];
  $('.price-badge price-charged').each(function(i, elem){
    var text = $(this).children().first().text();
    prices.push(parseInt(text.replace('$', '').replace(',','')));
  })
  prices.sort();
  buffer2write.CHprice = prices[Math.floor(prices.length / 2)];
}

// FairHealth helper (specific to their HTML)
var FHreq = function($) {
  console.log("We got to FHreq");
  var priceInsured = -1;
  var priceUninsured = -1;
  $('.circle out-net-summary').each(function(i, elem){
    var textUninsured = $(this).text();
    priceUninsured = parseInt(text.replace('$', '').replace(',',''));
  })
  $('.circle in-net-summary small').forEach(function(){
    var data = textInsured = $(this).text();
    priceInsured = parseInt(text.replace('$', '').replace(',',''));
  })

  // TO-DO: make a decision about price somehow
  buffer2write.FHprice = priceInsured;
}

// NewChoiceHealth helper (specific to their HTML)
var NCHreq = function($) {
  console.log("We got to NCHreq");
  var price = 0;
  $('.pull-left cost average').each(function(i, elem){
    var text = $(this).text();
    text = parseInt(text.replace('$', '').replace(',','').replace(' ',''));
  })
  buffer2write.NCHprice = price;
}


app.listen('8081');
console.log('The magic happens on port 8081');
// exports = module.exports = app;
