/* global NexT: true */

//$(document).ready(function () {
$(document).ready(bootstrap);
function bootstrap() {

  $(document).trigger('bootstrap:before');

  NexT.utils.isMobile() && window.FastClick.attach(document.body);

  NexT.utils.lazyLoadPostsImages();

  NexT.utils.registerBackToTop();

  $('.site-nav-toggle button').on('click', function () {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function () {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });
  

  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  //disable functin call when in ajax
  (!CONFIG.in_ajax) && NexT.utils.embeddedVideoTransformer();
  //remove 'menu-item-active' class first before add
  NexT.utils.removeActiveClassToMenuItem();
  NexT.utils.addActiveClassToMenuItem();

  // Define Motion Sequence.
  NexT.motion.integrator
    .add(NexT.motion.middleWares.logo);
  // when called by ajax, ignore menu motion.
  (!CONFIG.in_ajax) && NexT.motion.integrator
    .add(NexT.motion.middleWares.menu);
  NexT.motion.integrator
    .add(NexT.motion.middleWares.postList)
    .add(NexT.motion.middleWares.sidebar);

  $(document).trigger('motion:before');

  // Bootstrap Motion.
  CONFIG.motion && NexT.motion.integrator.bootstrap();

  $(document).trigger('bootstrap:after');
//});
}
