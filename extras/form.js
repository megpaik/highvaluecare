/*********************************
 * Button functionality
 * ******************************/
$('#submit').click(function() { $('.main').toggleClass("active"); });
$('#cancel').click(function() { $('.main').toggleClass("active"); });

/*******************************
 * Handle submissions***********
 ******************************/

$('#confirm').click(sendInfo);

var sendInfo = function() {
    
}
// $('#form').submit(function () {
//     console.log('clicked');
//     $.ajax({
//         method: 'POST',
//         url: '/submission',
//         data: this.serialize(),
//         success: function (data) {
//             console.log('success')
//         },
//         error: function(data) {
//             console.log('error');
//         }
//     });
//     console.log('done');
//     return false;
// });