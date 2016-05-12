

$(function() {

  
  $('img').load(function() {  
          $(this).fadeIn('slow');  
        });  



  
$( ".draggable" ).draggable({ containment: ".frame", cursor: "crosshair",  stack: ".draggable" });


$("input[type='checkbox']").change(function() {

      switch (this.id) {
      
        case 'slime': 
          if($(this).is(':checked')){
              $("body").addClass("slime");
                } else {
                  $("body").removeClass("slime");
                  }
            break;
          
      
      
        case 'email': 
          if($(this).is(':checked')){
              $(".email").css("visibility","visible");
                } else {
                  $(".email").css("visibility","hidden");
                  }
            break;
          
      
      
        case 'bio': 
          if($(this).is(':checked')){
              $(".bio").css("visibility","visible");
                } else {
                  $(".bio").css("visibility","hidden");
                  }
            break;            
          
      
      
        case 'work': 
          if($(this).is(':checked')){
              $(".work").css("visibility","visible");
                } else {
                  $(".work").css("visibility","hidden");
                  }
            break;
            };
            
            
            
          });
  
  $(function() {
        $('img[data-hover]').hover(function() {
            $(this)
                .attr('tmp', $(this).attr('src'))
                .attr('src', $(this).attr('data-hover'))
                .attr('data-hover', $(this).attr('tmp'))
                .removeAttr('tmp');
          }).each(function() {
          $('<img />').attr('src', $(this).attr('data-hover'));
          });;
      });
  
  
});