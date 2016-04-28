// variables
var name = "Andrew";
var zip = 10001;

// functions
function sayHello() {
  var greeting = "Hello " + name; 
  console.log(greeting);
}

sayHello();


$(document).ready(function() {
	$('#gender').click(function() {
		$('#sel4').val('strawberry');
	});
});

