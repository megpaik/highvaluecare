document.title = "highvalue_care";

// Store data from static CSV file
var macro = [];
// make lower case data available for search
var sorted = [];
// this is the capitalzied sorted array
var result = [];
// list of current items that are have already processed
var currItems = [];
var tableheadings = ['CPT', 'Intended Diagnosis', 'Sensitivity', 'Specificity', 'PPV', 'NPV', 'Cost'];

// Read from CSV file
Papa.parse("https://raw.githubusercontent.com/megpaik/pennapps/master/studies.csv", {
    download: true,
    skipEmptyLines: true,    
	complete: function(results) {
        macro = results.data;
        sorted = sort(macro);
        result = capitalize(sorted);
        console.log('parse studies');
	}
});

Papa.parse("https://raw.githubusercontent.com/megpaik/pennapps/master/lab-fees.csv", {
    download: true,
    skipEmptyLines: true,    
	complete: function(results) {
        var rawPrices = results.data;
        // This populates the cost column.
        for (var i = 0; i < rawPrices.length; i++) {
            for (var j = 0; j < result.length; j++) {
                if (result[j][1] === rawPrices[i][0]) {
                    result[j][7] = rawPrices[i][3];
                } else if (result[j][7] === "") {
                    result[j][7] = "N/A";
                }
            }
        }
        console.log('parse cost pdf')
        listfill();
    }
});

var listfill = function() {
    for (var i = 1; i < result.length; i++) {
        addStudy('#toplist', result[i]);                
    }
    console.log('listfill');
    currItems = [];
}

// sorting algorithm for 2D array based on the first column
// results in a lower case array
var sort = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (j < 1) { arr[i][j] = arr[i][j].toLowerCase(); }
        }
    }
    console.log('sort')
    return arr.sort();
}

var capitalize = function (array) {
    var capitalized = init(array.length, array[0].length);
    for (var i = 0 ; i < array.length ; i++){
        for (var j = 0; j < array[i].length; j++) {
            if (j < 1) { capitalized[i][j] = array[i][j].charAt(0).toUpperCase() + array[i][j].substr(1); }
            else { capitalized[i][j] = array[i][j]; }
        }
    }
    console.log('capitalize')
    return capitalized;
}

// initializes 2D array
var init = function(num1, num2) {
    var temp = new Array(num1);
    for (var i = 0; i < num1; i++) {
      temp[i] = new Array(num2);
    }
    console.log('init array')
    return temp;
}

// this changes between directory and main page
var changePage = function() {
    $('#directory').toggleClass("active");
    $('#container').toggleClass("active");
    console.log("changePage called");
}

var createTable = function (arr) {
    var table = document.createElement('table');
    var row1 = table.insertRow(0);
    var row2 = table.insertRow(1);
    // Populate the first row with headings
    for (var i = 0; i < tableheadings.length; i++) {
        row1.insertCell(i).innerHTML = tableheadings[i];
        row2.insertCell(i).innerHTML = arr[i+1];        
    }
    return table;
}

var addStudy = function(node, arr) {
    if (!currItems.includes(arr[0])) {
        $(node).append("<div class='item' id='" + arr[0] + "'></div>");
        var parent = document.getElementById(arr[0]);                    
        var text = document.createTextNode(arr[0]);
        parent.appendChild(text);
        currItems.push(arr[0]);
    }    
    // create a UNIQUELY TAGGED child node that stores the information
    var parent = document.getElementById(arr[0]);        
    var tag = arr[0]+arr[1]+arr[2]+arr[3];
    $(parent).append("<div class='description' id='" + tag + "'></div>");    
    var miniBox = document.getElementById(tag);
    var description = createTable(arr);
    miniBox.appendChild(description);
    //handle comments
    if (arr[8] !== "") {
        $(miniBox).append("<div class='comments'> *  " + arr[8] + "</div>");
    }
    // ~sliding~ toggle your welc
    $(parent).click(function() {
        $(miniBox).slideToggle("fast", function() {});
    });
}

// TESTING SERVER INTERACTION
// dummy.addEventListener("click", function() {
//         var xhr = new XMLHttpRequest();
//         xhr.open( "GET", '/data', true);
//         var res = xhr.response;
//         // request.setRequestHeader("Content-Type", "object");
//        console.log(typeof res);
//        console.log(res.value);
//     });

// this changes between search results and main page
var searchPage = function() {
    $('#results').toggleClass("active");
    $('#container').toggleClass("active");
    var bool = $('#results').hasClass("active");
    if (!bool) {
        $('#resultlist').empty();
        document.querySelector("input[type=text]").value = null;
    }
    console.log("searchPage called");
}

// handles search 
var searchEvent = function(keyword) {
            console.log(currItems);

    for (var i = 0; i < result.length; i++) {
        $('#resulthead').text('Results for: "' + keyword + '"');        
        var target = sorted[i][0];
        var diag = sorted[i][2];
        if (target.indexOf(keyword) >= 0 || diag.indexOf(keyword) >= 0) {
            addStudy('#resultlist', sorted[i]);
            console.log(currItems);
        }
    }
    searchPage();
}

// Search functionality
$('#submit').click(function() {
    var task = document.querySelector("input[type=text]")
    var input = task.value.toLowerCase();
    currItems = [];
    searchEvent(input);
});

$("#searchbar").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit").click();
    }
});

// Changes the page displayed
$('#seelist').click(changePage);
$('#seelist').hover(
    function() { $(this).css("font-style", "italic"); }, 
    function() { $(this).css("font-style", "normal"); }
);

// Back to main page
$('#back1').click(changePage);
$('#back2').click(searchPage);