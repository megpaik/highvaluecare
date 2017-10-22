var express     = require('express');
var app         = express();
var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');
var path        = require("path");
var bodyParser  = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------- */
//               OBJs to (OBJs + cost)            */
/* ---------------------------------------------- */

// MAIN function: given an object of many (CPT, url, hostName)s, write file
var scrapeThemAll = function(studyObjs) {
  allPromises = []
  for (var idx in studyObjs) {
    allPromises.push(
      getHTML(studyObjs[idx])
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

  fs.writeFile('./data/output.json', JSON.stringify(allCosts), (err) => {
    if (err) console.log(err);
    else console.log('File  written!');
  })
}

/* ---------------------------------------------- */
/*             HTML to COST delegatees            */
/* ---------------------------------------------- */

// HealthCareBlueBook helper
var HCBBreq = function($) {
  var price = -1;
  // get els with matching tag, and run a function on them?
  $('.arrow-box').each(function(i, elem){
    var text = $(this).children().first().text();
    price = parseInt(text.replace(/\D/g,''));
  })

  return price;
}

// ClearHealth helper
var CHreq = function($) {
  var prices = [];
  $('.price-badge.price-charged').each(function(i, elem){
    var text = $(this).children().last().text();
    prices.push(parseInt(text.replace(/\D/g,'')));
  })
  prices.sort((a,b) => { return a - b });
  return prices[Math.floor(prices.length / 2)];
}

// FairHealth helper
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
  return priceUninsured;
}

// NewChoiceHealth helper
var NCHreq = function($) {
  var price = -1;
  $('.pull-left.cost.average').each(function(i, elem){
    var text = $(this).text();
    price = parseInt(text.replace(/\D/g,''));
  })
  return price;
}


/* ---------------------------------------------- */
/*               CPT to URL GENERATORS            */
/* ---------------------------------------------- */

var genCH = function (cpt) {
    var url = "https://clearhealthcosts.com/search/?query=" + cpt +
    "&zip_code=19019&radius=5000&no_zero=1";
    return {cpt: cpt, url: url, hostName: 'CH'};
}

/* ---------------------------------------------- */
/*                  CPTs TO OBJS                  */
/* ---------------------------------------------- */

// Takes in cpt[], returns [] of objects {cpt, url, hostName} to be searched
var id2Objs = function (CPTs, callback) {
  var toSearch = [];
  // CH
  for (var idx in CPTs) {
    cpt = CPTs[idx];
    toSearch.push(genCH(cpt));
  }

  // HCBB
  fs.readFile('./data/hcbburls.json', 'utf8', function (err, data) {
    var input = JSON.parse(data);
    for (idx in input) {
      toSearch.push(input[idx]);
    }
    callback(toSearch);
  });
}

/* ---------------------------------------------- */
/*                    MAIN BODY                   */
/* ---------------------------------------------- */

// here's my test case
//var ids = [70551, 80048, 80061, 74000, 84075]

fs.readFile('./data/cpts.csv', 'utf8', function (err, data) {
  // Split up the CPTs into an array of 5 digit strings
  var ids = data.split(/\r|\n/);

  id2Objs(ids, scrapeThemAll);
});


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
