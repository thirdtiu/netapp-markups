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

  // slick carousel
  $('.multiple-items-carousel').slick({
    slidesToShow: 3,
    adaptiveHeight: true,
    prevArrow: '<a class="slick-prev"><i class="fas fa-chevron-left"></i></a>',
    nextArrow: '<a class="slick-next"><i class="fas fa-chevron-right"></i></a>',
  })

  // end slick carousel


  // hot links for the form modals
  if(window.location.href.indexOf('#whitepaper') != -1) {
    $('#whitepaperModal').modal('show');
  }

  if(window.location.href.indexOf('#free-trial') != -1) {
    $('#freeTrialModal').modal('show');
  }
  // end hotlinks

  // youtube embed in modal
  var $videoSrc;  
  $('.video-btn').click(function() {
      $videoSrc = $(this).data( "src" );
  });
  console.log($videoSrc);

    
    
  // when the modal is opened autoplay it  
  $('#youtubeModal').on('shown.bs.modal', function (e) {
      
  // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
  $("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
  })
    
    
  // stop playing the youtube video when I close the modal
  $('#youtubeModal').on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $("#video").attr('src',$videoSrc); 
  }) 
  // end youtube embed modal

});