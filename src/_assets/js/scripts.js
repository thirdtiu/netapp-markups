$(document).ready(function() {
  // start boostra affix replacement
  var toggleAffix = function(affixElement, scrollElement, wrapper) {
  
    var height = affixElement.outerHeight(),
        top = wrapper.offset().top;
    
    if (scrollElement.scrollTop() >= top){
        wrapper.height(height);
        affixElement.addClass("affix");
    }
    else {
        affixElement.removeClass("affix");
        wrapper.height('auto');
    }
      
  };
  

  $('[data-toggle="affix"]').each(function() {
    var ele = $(this),
        wrapper = $('<div></div>');
    
    ele.before(wrapper);
    $(window).on('scroll resize', function() {
        toggleAffix(ele, $(this), wrapper);
    });
    
    // init
    toggleAffix(ele, $(window), wrapper);
  });

  // end bootstrap affix replacement

  $('.multiple-items-carousel').slick({
    slidesToShow: 3,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
    nextArrow: '<button type="button" class="slick-next">&gt;</button>',
  })

  

});