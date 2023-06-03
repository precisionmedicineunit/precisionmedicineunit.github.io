/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/


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
    color: ["#03dac6", "#ff0266", "#000000"],
    connectParticles: true,
    maxParticles: particleCount
  });
};



// window.onload = function () {
//   Particles.init({
//     selector: ".background"
//   });
// };
// const particles = Particles.init({
//   selector: ".background",
//   color: ["#03dac6", "#ff0266", "#000000"],
//   connectParticles: true,
//   responsive: [
//     {
//       breakpoint: 768,
//       options: {
//         color: ["#faebd7", "#03dac6", "#ff0266"],
//         maxParticles: 83,
//         // connectParticles: false
//         connectParticles: true
//       }
//     }
//   ]
// });

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

  // onTabClick(event, element) {
  //   event.preventDefault();
  //   let scrollTop =
  //     $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
  //   $("html, body").animate({ scrollTop: scrollTop }, 600);
  // }

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

  // checkHeaderPosition() {
  //   const headerHeight = 75;
  //   if ($(window).scrollTop() > headerHeight) {
  //     $(".nav-container").addClass("nav-container--scrolled");
  //   } else {
  //     $(".nav-container").removeClass("nav-container--scrolled");
  //   }
  //   let offset =
  //     $(".nav").offset().top +
  //     $(".nav").height() -
  //     this.tabContainerHeight -
  //     headerHeight;
  //   if (
  //     $(window).scrollTop() > this.lastScroll &&
  //     $(window).scrollTop() > offset
  //   ) {
  //     $(".nav-container").addClass("nav-container--move-up");
  //     $(".nav-container").removeClass("nav-container--top-first");
  //     $(".nav-container").addClass("nav-container--top-second");
  //   } else if (
  //     $(window).scrollTop() < this.lastScroll &&
  //     $(window).scrollTop() > offset
  //   ) {
  //     $(".nav-container").removeClass("nav-container--move-up");
  //     $(".nav-container").removeClass("nav-container--top-second");
  //     $(".nav-container-container").addClass("nav-container--top-first");
  //   } else {
  //     $(".nav-container").removeClass("nav-container--move-up");
  //     $(".nav-container").removeClass("nav-container--top-first");
  //     $(".nav-container").removeClass("nav-container--top-second");
  //   }
  // }
checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
}


  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
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

