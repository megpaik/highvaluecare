document.title = "highvalue.care";

var studies = {};
var tableheadings = ['CPT', 'Intended Diagnosis', 'Sensitivity', 'Specificity', 'PPV', 'NPV', 'Cost'];

// Read from JSON file (on server) and take those results
var readStudiesReq = $.getJSON( "https://raw.githubusercontent.com/megpaik/pennapps/master/testStudies.json", (json) => {
  studies = alphabetize(clean(json));
  listfill(studies);
});

// Helper 1 - cleans JSON and returns an object with all the studies (entries)
// Renames all the studies by name_diagnosis
var clean = function (obj) {
  var modifiedEntries = {};

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var modifiedEntry = obj[prop];
      var lowerName = prop.toLowerCase();
      var lowerDiag = modifiedEntry['Intended Diagnosis'].toLowerCase();
      var uniqueID = lowerName + '_' + lowerDiag;
      modifiedEntry.lowerName = lowerName;
      modifiedEntry.lowerDiag = lowerDiag;
      modifiedEntry.ID = uniqueID;

      modifiedEntries[uniqueID] = modifiedEntry;
    }
  }
  return modifiedEntries;
}

// Helpter 2 - alphabetizes properties of studies by removing and adding them
var alphabetize = function(studies, expected) {
  var keys = Object.keys(studies).sort(function keyOrder(k1, k2) {
      if (k1 < k2) return -1;
      else if (k1 > k2) return +1;
      else return 0;
  });

  var holder = {};
  for (var i = 0; i < keys.length; i++) {
    holder[keys[i]] = studies[keys[i]];
    delete studies[keys[i]];
  }

  for (i = 0; i < keys.length; i++) {
    studies[keys[i]] = holder[keys[i]];
  }
  return studies;
}

// Helper 3 - Fills the page with all studies
var listfill = function(studies) {
  var currItems = {};
  for (var study in studies) {
    if (studies.hasOwnProperty(study)) { addStudy('toplist', studies[study], currItems); }
  }
}

// Helper 3a - adds a single study to the page by taking its object
var addStudy = function(node, study, items) {
  // Check currItems for existing study header, if doesn't exist, make one
  if (!items.hasOwnProperty(study.name)) {
    $('#' + node).append("<div class='item' id='" + node + study.name + "'>" + study.name + "</div>");
    items[study.name] = {taken: true};
  }

  // Now we're inside the study header, add the object with a unique tag
  var inner = document.getElementById(node + study.name);
  $(inner).append("<div class='description' id='" + node + study.ID + "'></div>");
  var miniBox = document.getElementById(node + study.ID);
  var description = createTable(study);
  miniBox.appendChild(description);

  //handle comments
  if (study.hasOwnProperty('comments')) {
    for (c in study.comments) {
      $(miniBox).append("<div class='comments'> *  " + c + "</div>");
    }
  }

  // ~sliding~ toggle
  $(inner).click(function() {
      $(miniBox).slideToggle("fast", function() {});
  });
}

// Helper 3b - makes the table out of a study object
var createTable = function (study) {
  var table = document.createElement('table');
  var row1 = table.insertRow(0);
  var row2 = table.insertRow(1);

  // Populate the first row with headings
  for (var i = 0; i < tableheadings.length; i++) {
      row1.insertCell(i).innerHTML = tableheadings[i];
      row2.insertCell(i).innerHTML = study[tableheadings[i]];
  }
  return table;
}

// this changes between directory and main page
var changePage = function() {
    $('#directory').toggleClass("active");
    $('#container').toggleClass("active");
    console.log("changePage called");
}

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
  var bool = $('#results').hasClass("active");
  if (bool) $('#resultlist').empty();
  var searched = {};
  for (s in studies) {
    if (searchMatch(keyword, studies[s])) {
      addStudy('resultlist', studies[s], searched);
    }
  }
  if (!bool) searchPage();
}

// Helper 4 - string matching
var searchMatch = function (keyword, study) {
  return (study.ID.indexOf(keyword) >= 0 );
}

// Search functionality
$('#submit').click(function() {
    var task = document.querySelector("input[type=text]")
    var input = task.value.toLowerCase().trim();
    if (input === "") return; 
    document.getElementById("searchtop").value = input;    
    searchEvent(input);
});

$("#searchbar").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit").click();
    }
});

// searching from the results page
$('#newsearch').click(function() {
  var task = document.querySelector("#searchtop");
  var input = task.value.toLowerCase().trim();
  if (input === "") return;
  searchEvent(input); 
});

$("#searchtop").keyup(function(event){
  if(event.keyCode == 13){
      $("#newsearch").click();
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
