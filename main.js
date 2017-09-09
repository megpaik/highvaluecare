document.title = "Penn Medicine Searcher";

var changePage = function() {
    $('#directory').toggleClass("active");
    $('#container').toggleClass("active");
}

// Button functionality
$('#submit').click(changePage);

// Changes the page displayed

$('#seelist').click(changePage);
$('#seelist').hover(
    function() { $(this).css("font-style", 'italic'); }, 
    function() { $(this).css("font-style", "normal"); }
);