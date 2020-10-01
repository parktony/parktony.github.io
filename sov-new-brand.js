$('body').prepend('<style>@font-face{font-family: "National Condensed Bold"; src: url("/apps/settings/wcm/designs/wbc/clientlib-all/assets/brand/font/national-2-condensed-web-bold.woff2") format("woff2"), url("/apps/settings/wcm/designs/wbc/clientlib-all/assets/brand/font/national-2-condensed-web-bold.woff") format("woff"), url("/apps/settings/wcm/designs/wbc/clientlib-all/assets/brand/font/national-2-condensed-web-bold.eot") format("eot")}.target-carousel.carousel .slide-text-header{font-family: "National Condensed Bold", "chronicle-disp-semibold","Times New Roman","Times",serif,-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif; text-transform: uppercase;}.target-carousel.carousel .slide-text-header .slide-text-classic{line-height: 0.9;}.target-carousel.carousel .slide:before{background-image: none;}.target-carousel.carousel .slide:after{background-image: none; background-color: #DA1710;}.target-carousel.carousel .slide-pink.slide:after{background-color: #DA1710;}.target-carousel.carousel .slide-blue.slide:after{background-color: #DA1710;}.target-carousel.carousel .slide-red.slide:after{background-color: #991AD6;}@media (max-width: 767px){.target-carousel.carousel .slide:after{border-top: 10px solid #FF3DDB;}.target-carousel.carousel .slide-pink.slide:after{border-top: 10px solid #FF3DDB;}.target-carousel.carousel .slide-blue.slide:after{border-top: 10px solid #1F1C4F;}.target-carousel.carousel .slide-red.slide:after{border-top: 10px solid #DA1710;}}@media (min-width: 768px){.target-carousel.carousel .slide:after{right: 51.25%; border-left: 20px solid #FF3DDB;}.target-carousel.carousel .slide-pink.slide:after{border-left: 20px solid #FF3DDB;}.target-carousel.carousel .slide-blue.slide:after{border-left: 20px solid #1F1C4F;}.target-carousel.carousel .slide-red.slide:after{border-left: 20px solid #DA1710;}}@media (max-width: 767px){.target-carousel.carousel .slide-text-classic{font-size: 32px;}}@media (min-width: 768px){.target-carousel.carousel .slide-text-classic{font-size: 38px;}}@media (min-width: 992px){.target-carousel.carousel .slide-text-classic{font-size: 38px;}}@media (min-width: 1200px){.target-carousel.carousel .slide-text-classic{font-size: 52px;}}</style>');

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
