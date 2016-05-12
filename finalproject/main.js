
var SHOW_DURATION = 70;
var SHOW_TERM = 500;
var HIDE_TERM = 300;
var INIT_SALRY = 60000;
var DOLLAR_PATH = "dollar.png";
var DOLLAR_WIDTH = "80px"
var DOLLAR_HEIGHT = "116px";
var DOLLAR_AMOUNT = {
	gender: {
		male: 20,
		female: 16
	},
	ethnics: {
		asian: 12,
		white: 20,
		hispanic: 18,
		black: 15,
		other: 10
	},
	age: {
		'20s': 18,
		'30s': 22,
		'40s': 25,
		'50s': 20,
		'60s': 14,
		'70s': 8,
		'80s': 6 
	},
	hours: {
		'20h': 20,
		'19h': 19,
		'18h': 18,
		'17h': 17,
		'16h': 16,
		'15h': 15,
		'14h': 14,
		'13h': 13,
		'12h': 12,
		'11h': 11,
		'10h': 10,
		'9h' : 9,
		'8h' : 8,
		'7h' : 7,
		'6h' : 6,
		'5h' : 5,
		'4h' : 4,
		'3h' : 3,
		'2h' : 2,
		'1h' : 1
	},
	place: {
		california: 16,
		northeast: 24,
		midwest: 18,
		south: 20,
		midAtalntic: 18,
		pacific: 20,
		sw: 30,
		mountain: 16,
		texas: 14
	}
}
var SALARY_RATIO = {
	gender: {
		male: 1,
		female: 0.80
	},
	ethnics: {
		asian: 0.92,
		white: 1,
		hispanic: 0.95,
		black: 0.93,
		other: 0.90
	},
	age: {
		'20s': 0.92,
		'30s': 0.97,
		'40s': 1,
		'50s': 0.95,
		'60s': 0.90,
		'70s': 0.87,
		'80s': 0.85 
	},
	hours: {
		'20h': 1,
		'19h': 1,
		'18h': 1,
		'17h': 1,
		'16h': 1,
		'15h': 1,
		'14h': 1,
		'13h': 1,
		'12h': 1,
		'11h': 1,
		'10h': 1,
		'9h' : 1,
		'8h' : 1,
		'7h' : 1,
		'6h' : 1,
		'5h' : 1,
		'4h' : 1,
		'3h' : 1,
		'2h' : 1,
		'1h' : 1
	},
	place: {
		california: 0.85,
		northeast: 0.95,
		midwest: 0.87,
		south: 0.90,
		midAtalntic: 0.93,
		pacific: 0.90,
		sw: 1,
		mountain: 0.95,
		texas: 0.85
	}
}

var salaryTable = {
	gender: 0,
	ethnics: 0,
	age: 0,
	place: 0
}

$('document').ready(function(){
	$('select').bind('change', function(e){
					var $target = $(e.target);
					var division = $target.attr('id');
					var value = $target.val();

					dollarRain(division,DOLLAR_AMOUNT[division][value]);
					setSalaryTable(division, SALARY_RATIO[division][value]);
					writeSalary();
				})
})

var setSalaryTable = function(division, value) {
	salaryTable[division] = value;
}


var writeSalary = function(){
	var salaryAmount = INIT_SALRY;
	$.each(salaryTable, function(key,val){
		salaryAmount *= val;
	})
	if(salaryAmount)
		$('#salary').val(parseInt(salaryAmount)+'$');
}


var dollarRain = function(division, amount){	
	var layerID = "_layer_" + division;
	var $background = $('#'+layerID);

	
	if ($background.length>0 && $background.children('img').length>0) {
		$background.children('img').each(function(idx){
			$(this).animate({
				top: -(parseInt(DOLLAR_HEIGHT) + 100)
			}, HIDE_TERM, 'swing', function(){
				$(this).remove();
			});
		});
	} else {
		$('#background').append('<div id='+layerID+'></div>');
	}

	for(var i=0; i<amount; i++){
		
		setTimeout(function(){
			
			var img_setting = {
				width: (1 + Math.random() * 40 * 0.01) * (parseInt(DOLLAR_WIDTH) * 0.8),
				rotate: (Math.random() < 0.5 ? '-' : '+') + (Math.random() * 15),
			};

			var $img = $('<img/>', {
				src: DOLLAR_PATH,
				css: {
					top: '-'+ DOLLAR_HEIGHT,
					transform: 'rotate(' + img_setting.rotate + 'deg)',
					width: img_setting.width + 'px',
					left: Math.random() * ($(document).width() - img_setting.width) + 'px'
				}
			});

			$('#'+layerID).append($img);
			$img.animate({ 
	       	 top: $(document).height() - (Math.random() * $(document).height() * 0.3) - parseInt(DOLLAR_HEIGHT),
	     	 }, SHOW_TERM, 'swing');
		}, SHOW_DURATION * i);
	}
}