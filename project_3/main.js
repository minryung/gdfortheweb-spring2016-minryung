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

if(obj){ // check whether there is any object selected
for(var i=0; i<obj.length; i++){
print(i);
var pts = [];
var j = 0;
var l = new Path();
l.strokeColor = CMYKColor(1,0,0,0);
l.strokeWidth = 0.1;
l.strokeCap = 'round';
l.strokeJoin = 'round';
while(obj[i].getPoint(20*j)){ // check whether obj[i].getPoint(pos) is true or false
pts[j] = obj[i].getPoint(20*j); 
if(pts[j-1]!=null){
l.add(pts[j], pts[j-1]);
} 
var cir = new Path.Circle(pts[j], 2);
cir.strokeColor = null;
cir.fillColor = CMYKColor(0,1,1,0);
j++;
}
}
}
