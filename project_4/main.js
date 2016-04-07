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
	$(this).html($(this).data("letter"));
	$(".j").effect( "bounce", {times:3}, 300 );
 });

$("div").click(function() {
	$(this).addClass("clicked");

	
	var randomcolor = Math.random() * 10000;
	$(this).css("size", randNumber + "1000px");
});