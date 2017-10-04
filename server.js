var express     = require('express');
var app         = express();
var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');
var path        = require("path");
var async       = require('async');
var bodyParser  = require('body-parser');

var costs = {}
var preHCBBurls = []
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/* ---------------------------------------------- */
//               OBJs to (OBJs + cost)            */
/* ---------------------------------------------- */

// MAIN function: given an object of many (CPT, url, hostName)s, write file
var scrapeThemAll = function(studyObjs) {
  allPromises = []
  for (var studyObj in studyObjs) {
    allPromises.push(
      getHTML(studyObjs[studyObj])
      .then(getCost))
    }

    // allPromises contains promises that will resolve on their costedObj
    Promise.all(allPromises).then(writeCosts)
}

// Helper Promise 1 - Given studyObj, requests for HTML
var getHTML = function (obj) {
  return new Promise((resolve, reject) => {
    request(obj.url, function (error, response, html) {
      var output = {html: html, cpt: obj.cpt, hostName: obj.hostName}
      if (error) reject(error)
      else resolve(output)
    })
  })
};

// Helper Promise 2 - Given html, calculates costedObj
var getCost = function (input) {
  return new Promise((resolve, reject) => {
    var costedObj = {hostName: input.hostName, cpt: input.cpt,
      cost: loadAndDelegate(input.html, input.hostName)}
    resolve(costedObj)
  })
};

// getCost helper - uses cheerio and delegates
var loadAndDelegate = function(html, hostName) {
  var $ = cheerio.load(html);
  switch (hostName) {
    case "HCBB":
    return HCBBreq($);
    break;
    case "CH":
    return CHreq($);
    break;
    case "FH":
    return FHreq($);
    break;
    case "NCH":
    return NCHreq($);
    break;
    case "preHCBB":
    preHCBBurls.push(preHCBBreq($));
  }

}

// Helper - Takes an array of costedObjs and writes the file
var writeCosts = function (costedObjs) {

  allCosts = {}
  for (var o in costedObjs) {
    var curr = {}
    if (allCosts[costedObjs[o].cpt] != undefined) {
      curr = allCosts[costedObjs[o].cpt]
    }
    curr[costedObjs[o].hostName] = costedObjs[o].cost
    allCosts[costedObjs[o].cpt] = curr
  }

  fs.writeFile('output.json', JSON.stringify(allCosts), (err) => {
    if (err) console.log(err);
    else console.log('File  written!');
  })
}

/* ---------------------------------------------- */
/*             HTML to COST delegatees            */
/* ---------------------------------------------- */

// HealthCareBlueBook helper
var HCBBreq = function($, cpt) {
  var price = -1;
  // get els with matching tag, and run a function on them?
  $('.arrow-box').each(function(i, elem){
    var text = $(this).children().first().text();
    price = parseInt(text.replace(/\D/g,''));
  })

  return price;
}

// ClearHealth helper
var CHreq = function($, cpt) {
  var prices = [];
  $('.price-badge.price-charged').each(function(i, elem){
    var text = $(this).children().last().text();
    prices.push(parseInt(text.replace(/\D/g,'')));
  })
  prices.sort((a,b) => { return a - b });
  return prices[Math.floor(prices.length / 2)];
}

// FairHealth helper
var FHreq = function($, cpt) {
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

// NewChoiceHealth helper
var NCHreq = function($, cpt) {
  var price = -1;
  $('.pull-left.cost.average').each(function(i, elem){
    var text = $(this).text();
    price = parseInt(text.replace(/\D/g,''));
  })
  return price;
}


// returns URL for HCBB helper
// TODO: FIX
var preHCBBreq = function($, cpt) {
  var url = $('#cphDefaultMaster_lblResultLeft').find('div.service-name').children().first().attr('href')
  return "https://healthcarebluebook.com/" + url;
}

/* ---------------------------------------------- */
/*               CPT to URL GENERATORS            */
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
  "&zip_code=19019&radius=2500&no_zero=1&submit=")
}

/* ---------------------------------------------- */
/*                  CPTs TO OBJS                  */
/* ---------------------------------------------- */

// Takes in array of IDs, returns objects {cpt, url, hostName}
// TODO: Implement more than just CH
var id2Objs = function(CPTs) {
  objs = {}
  for (var cpt in CPTs) {
    var objCH = {cpt: CPTs[cpt], url: genCH(CPTs[cpt]), hostName: 'CH'}
    objs['CH_' + CPTs[cpt]] = objCH
  }
  return objs
}

/* ---------------------------------------------- */
/*                    MAIN BODY                   */
/* ---------------------------------------------- */

// here's my test case
//var ids = [70551, 80048, 80061, 74000, 84075]

fs.readFile('cpts.csv', 'utf8', function (err, data) {
  console.log(typeof data)
  var dataArray = data.split(/\r|\n/);
  var ids = dataArray;
  // werk
  var objs = id2Objs(ids)
  var costedObjs = scrapeThemAll(objs)
})






// // what to do when we visit '/scrape'
// app.get('/scrape', (req, res) => {
//
//
//   // finally, we'll just send out a message to the browser
//   res.sendFile(path.join(__dirname+'/mainpage.html'));
// });
//
// app.listen('8081');
// console.log('The magic happens on port 8081');
// exports = module.exports = app;
