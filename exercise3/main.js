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
	var greeting = "Hello " + name; ;
	$(this).css("size", randNumber + "1000px");

}, function() {
	$(this).removeClass("h");
});

$("div").click(function() {
	$(this).addClass("clicked");
	var randomcolor = Math.random() * 10000;
	$(this).css("size", randNumber + "1000px");
});
