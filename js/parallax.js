$(document).ready(function(){
    $window = $(window);
    if (window.matchMedia("only screen and (min-width: 1224px").matches) {
        $('section[data-type="background"]').each(function(){
             // declare the variable to affect the defined data-type
             var $scroll = $(this);

              $(window).scroll(function() {                            
                var yPos = -($window.scrollTop() / $scroll.data('speed')); 
                // background position
                var coords = '50% '+ yPos + 'px';
                // move the background
                $scroll.css({ backgroundPosition: coords });    
              }); 
           });
    } 
});


