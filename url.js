var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

function hc(str){
    var HCBB = "https://healthcarebluebook.com/page_SearchResults.aspx?SearchTerms=" + str + "&tab=ShopForCare";
    var link = ""; //PARSE HTML HERE (div class = 'service-name')



    return "https://healthcarebluebook.com/page_ProcedureDetails" + link.subString(11)
}

function chc(str){
    var CH = "https://clearhealthcosts.com/search/?query=" + str + "+X-ray+exam+upper+gi+tract&zip_code=19019&radius=25&no_zero=1&submit="
    return CH;
}
