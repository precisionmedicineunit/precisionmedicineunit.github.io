window.onload = function () {
  var screenWidth = window.innerWidth;
  var particleCount;
  if (screenWidth <= 480) {        // For mobile screens (<= 480px)
    particleCount = 30;
  } else if (screenWidth <= 768) { // For tablet screens (> 480px and <= 768px)
    particleCount = 60;
  } else if (screenWidth <= 1024) { // For small desktop screens (> 768px and <= 1024px)
    particleCount = 90;
  } else {                         // For large desktop screens (> 1024px)
    particleCount = 120;
  }

  Particles.init({
    selector: ".background",
    // color: ["#03dac6", "#ff0266", "#000000"], // mint, pink, black
    color: ["#505050", "#999999", "#000000"], // greys
    connectParticles: true,
    maxParticles: particleCount
  });
};

class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $(".nav-tab").click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

onTabClick(event, element) {
  event.preventDefault();
  let scrollTop = $(element.attr("href")).offset().top;
  $("html, body").animate({ scrollTop: scrollTop }, 600);
}


  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
}

// updated to inlude sub-sections in nav icon
	findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
      if (id === '#tab-more') {
        $('.sub-section').each(function () {
          let offsetTop = $(this).offset().top - self.tabContainerHeight;
          let offsetBottom =
            $(this).offset().top + $(this).height() - self.tabContainerHeight;
          if (
            $(window).scrollTop() > offsetTop &&
            $(window).scrollTop() < offsetBottom
          ) {
            newCurrentId = id;
            newCurrentTab = $('.nav-tab[href="#tab-more"]');
          }
        });
      } else {
        let offsetTop = $(id).offset().top - self.tabContainerHeight;
        let offsetBottom =
          $(id).offset().top + $(id).height() - self.tabContainerHeight;
        if (
          $(window).scrollTop() > offsetTop &&
          $(window).scrollTop() < offsetBottom
        ) {
          newCurrentId = id;
          newCurrentTab = $(this);
        }
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }


  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".nav-tab-slider").css("width", width);
    $(".nav-tab-slider").css("left", left);
  }
}

new NavigationPage();
/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/

