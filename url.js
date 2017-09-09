var Browser = require("zombie");
var assert = require("assert");

browser = new Browser()
browser.visit("https://www.fairhealthconsumer.org/estimate-costs/step-1", function () {
    browser.choose('input[id="radio1"]');
    browser.clickLink('input[class="step1Btn"]');
    browser.fill('input[id="location"]', "07046");
    browser.clickLink('input[class="step2Btn"]');
    browser.fill('input[id="care-code"]', "84445\n");
    console.log(browser.location());
    // wait for new page to be loaded then fire callback function
    browser.wait().then(function() {

        // just dump some debug data to see if we're on the right page
        console.log(browser.dump());
    })
});