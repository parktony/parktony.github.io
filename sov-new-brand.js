function assignSOVColour() {
//console.log("target: base - colour assigned");
  $('.carousel:eq(0) .slide .slide-text-footer a').each(function(){

    //remove any previously assigned colour variant (if applicable)
    $(this).parents('.slide').removeClass('slide-red slide-blue slide-pink');

    //check CTA link URLs for sovclr parameters
    if ($(this).attr('href').indexOf("sovclr=red") > -1) {
      $(this).parents('.slide').addClass('slide-red');
    } else if ($(this).attr('href').indexOf("sovclr=blue") > -1) {
      $(this).parents('.slide').addClass('slide-blue');
    } else {
      //if no parameter present then apply pink by default
      $(this).parents('.slide').addClass('slide-pink');
    }

  });  

}

//function to wait for targeting banners to appear and then assign colours
function waitForTargeting() {
  //console.log("target: base - observer set");
  var targetElement = $('.slider')[0];
  //console.log(targetElement);
  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      //console.log("target: base - mutation detected");
      //console.log(mutation);
      //check if mutation is addition and removal of content i.e. injection of targeting banner
      if (mutation.addedNodes.length > 0 && mutation.removedNodes.length > 0) {
        //console.log("target: base - mutation eligible");
        assignSOVColour();
      }
    });
  });
  var config = {
    childList: true
  };
  observer.observe(targetElement, config);
}

//assign colours upon document ready (for banners in SOV carousel) and run function to wait for Target to load
$(document).ready(function(){

  $('.carousel:eq(0)').addClass('target-carousel');

  assignSOVColour();
  
  waitForTargeting();
  
});
