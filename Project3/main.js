// variables
var name = "Andrew";
var zip = 10001;

// functions
function sayHello() {
  var greeting = "Hello " + name; 
  console.log(greeting);
}

sayHello();

$("div").hover(function() {
	$(this).addClass("mouseovered");
	
});

$("div").click(function() {
	$(this).addClass("clicked");

});
