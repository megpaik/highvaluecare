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
    if (studyObjs[idx].url == '') continue;
    console.log(studyObjs[idx].url);
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

  fs.writeFile('output.json', JSON.stringify(allCosts), (err) => {
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

var genHCBB = function(cpt) {
  return new Promise((resolve, reject) => {
    var initUrl = "https://healthcarebluebook.com/page_SearchResults.aspx?SearchTerms=" + cpt;
    request(initUrl, function (error, response, html) {
      var $ = cheerio.load(html);
      var branch = $('#cphDefaultMaster_lblResultLeft');
      if (branch.children('.physician').length == 0) {
        resolve({cpt: cpt, url: '', hostName: 'HCBB'});
      } else {
        var href = branch.children('.service-name').children().attr('href');
        var suffix = href.slice(href.indexOf('?'));
        var url = "https://healthcarebluebook.com/page_ProcedureDetails.aspx" + suffix;
        resolve({cpt: cpt, url: url, hostName: 'HCBB'});
      }
    });
  });
}

var genCH = function (cpt) {
  return new Promise((resolve, reject) => {
    var url = "https://clearhealthcosts.com/search/?query=" + cpt +
    "&zip_code=19019&radius=2500&no_zero=1&submit=";
    resolve({cpt: cpt, url: url, hostName: 'CH'});
  });
}

/* ---------------------------------------------- */
/*                  CPTs TO OBJS                  */
/* ---------------------------------------------- */

// Takes in array of IDs, returns [] of objects {cpt, url, hostName}
var id2Objs = function (CPTs) {
  return new Promise((resolve, reject) => {
    var allPromises = [];

    for (var idx in CPTs) {
      cpt = CPTs[idx];
      allPromises.push(genCH(cpt));
      allPromises.push(genHCBB(cpt));
    }

    Promise.all(allPromises).then(resolve);
  });
};

/* ---------------------------------------------- */
/*                    MAIN BODY                   */
/* ---------------------------------------------- */

// here's my test case
//var ids = [70551, 80048, 80061, 74000, 84075]

fs.readFile('cpts.csv', 'utf8', function (err, data) {
  var dataArray = data.split(/\r|\n/);
  var ids = dataArray;
  // werk
  var costedObjs = id2Objs(ids).then(scrapeThemAll);
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
