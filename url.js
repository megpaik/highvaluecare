var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

const {Builder, By, until} = require('selenium-webdriver');

var app     = express();

function hc(str){
    var HCBB = "https://healthcarebluebook.com/page_SearchResults.aspx?SearchTerms=" + str + "&tab=ShopForCare";
    var link = ""; //PARSE HTML HERE (div class = 'service-name')



    return "https://healthcarebluebook.com/page_ProcedureDetails" + link.substring(11)
}

function chc(str){
    var CH = "https://clearhealthcosts.com/search/?query=" + str + "+X-ray+exam+upper+gi+tract&zip_code=19019&radius=2500&no_zero=1&submit="
    return CH;
}

function fh(str){
  var driver = new Builder()
  .forBrowser('chrome')
  .build();

driver.get('https://www.fairhealthconsumer.org/estimate-costs/step-1');
radio = driver.findElement(By.className('indicator ion-ios-circle-outline'))
radio.click();
driver.findElement(By.className('step1Btn')).click();
driver.findElement(By.className('form-control ui-autocomplete-input')).sendKeys("19104");
driver.findElement(By.className('step2Btn')).click();
//setTimeout(function(){driver.findElement(By.className('form-control ui-autocomplete-input')).sendKeys("aaaaa");}, 1000);





driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
}
