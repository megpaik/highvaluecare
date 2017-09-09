var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


// generic scraper
var scrapePrice = function(hostName, url) {
  app.get('/scrape', function(req, res){
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var title, release, rating;
        var json = {};

        switch (hostName) {
          case "HCBB":
          HCBBreq(url, json).bind(this);
          break;
          case "CH":
          CHreq(url, json).bind(this);
          break;
          case "FH":
          FHreq(url, json).bind(this);
          break;
          case "NCH":
          NCHreq(url, json).bind(this);
        }
      }
      // write the File, replace later
      fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File  written!');
      })
    }) ;
  })
}

// HealthCareBlueBook helper (specific to their HTML)
var HCBBreq = function(url, json) {
  var price = -1;
  // get els with matching tag, and run a function on them?
  $('.arrow-box').forEach(function(){
    var data = $(this);
    price = data.children().first().text();
  })
  json.price = price;
}

// HealthCareBlueBook helper (specific to their HTML)
var CHreq = function(url, json) {
  var prices = [];
  $('.price-badge price-charged').forEach(function(){
    var data = $(this);
    prices.push(data.children().first().text());
  })
  prices.sort();
  json.price = prices[Math.floor(prices.length / 2)];
}


// FairHealth helper (specific to their HTML)
var FHreq = function(url, json) {
  price = 0;
  $('.circle out-net-summary').forEach(function(){
    var data = $(this);
    price = data.text();
  })
  json.price = price;
}

// newchoicehealth scrape
var NCHreq = function(url, json) {
  price = 0;
  $('.pull-left cost average').forEach(function(){
    var data = $(this);
    price = data.text();
  })
  json.price = price;
}

app.listen(8081, function() { console.log('Magic happens on port 8081')});

// exports = module.exports = app;
