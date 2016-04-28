// variables
var name = "Andrew";
var zip = 10001;

// functions
function sayHello() {
  var greeting = "Hello " + name; 
  console.log(greeting);
}

sayHello();



$('.selectstyle').hover(function () {
    $('.money').show();
}).mouseout(function () {
    $('.money').hide();
});



function myFunction() {
    var x = document.getElementById("gender").value;
    document.getElementById("demo").innerHTML = "$";
    $("#box").animate({height: "300px"});
}

