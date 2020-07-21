/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/sass/app.scss":
/*!*************************************!*\
  !*** ./public/assets/sass/app.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* ------------------------------------------------------------------

    Name:       Baston - Responsive Admin Dashboard Template
    File name:  app.js
    Author:     laborasyon
    Author URL: https://themeforest.net/user/laborasyon/portfolio

--------------------------------------------------------------------- */


(function ($) {
  var wind_ = $(window),
      body_ = $('body'),
      navigation_active_link = $('.navigation .navigation-menu-body ul li a.active'),
      navigation_active_menu = navigation_active_link.parents('ul').last().attr('id');
  flexTable(); // Feather icon

  feather.replace({
    'stroke-width': '1.2'
  }); // ----------------------------------
  // Active pages, automatically show on the menu

  navigation_active_link.parents('li').each(function (e, i) {
    if (e > 0) {
      $(i).addClass('open');
    }
  });
  $('.navigation .navigation-menu-body ul#' + navigation_active_menu).show();
  $('.navigation .navigation-menu-tab ul li a[data-menu-target="#' + navigation_active_menu + '"]').addClass('active'); // ----------------------------------
  // Background image attr

  $('[data-background-image]').each(function (e) {
    $(this).css("background", 'url(' + $(this).data('background-image') + ')');
  }); // ----------------------------------
  // Responsive table

  var table_responsive_stack = $(".table-responsive-stack");
  table_responsive_stack.find("th").each(function (i) {
    $(".table-responsive-stack td:nth-child(" + (i + 1) + ")").prepend('<span class="table-responsive-stack-thead">' + $(this).text() + ":</span> ");
    $(".table-responsive-stack-thead").hide();
  });
  table_responsive_stack.each(function () {
    var thCount = $(this).find("th").length,
        rowGrow = 100 / thCount + "%";
    $(this).find("th, td").css("flex-basis", rowGrow);
  }); // ----------------------------------
  //------------------- Methods -------------------

  $.createOverlay = function () {
    if ($('.overlay').length < 1) {
      body_.addClass('no-scroll').append('<div class="overlay"></div>');
      $('.overlay').addClass('show');
    }
  };

  $.removeOverlay = function () {
    body_.removeClass('no-scroll');
    $('.overlay').remove();
  };

  function flexTable() {
    if (wind_.width() < 768) {
      $(".table-responsive-stack").each(function (i) {
        $(this).find(".table-responsive-stack-thead").show();
        $(this).find("thead").hide();
      }); // window is less than 768px
    } else {
      $(".table-responsive-stack").each(function (i) {
        $(this).find(".table-responsive-stack-thead").hide();
        $(this).find("thead").show();
      });
    }
  } //------------------- Events -------------------


  window.onresize = function () {
    flexTable();
  }; // Navigation menu tab


  $(document).on('click', '.navigation .navigation-menu-tab ul li a', function () {
    var $this = $(this),
        target = $this.data('menu-target');
    $('.navigation .navigation-menu-tab ul li a').removeClass('active');
    $this.addClass('active');
    $('.navigation .navigation-menu-body > ul').hide();
    $('.navigation .navigation-menu-body > ul' + target).show();
    return false;
  }); // ----------------------------------
  // Navigation collapse

  $(document).on('click', '.navigation ul li a', function () {
    var $this = $(this);

    if ($this.next('ul').length) {
      if (!body_.hasClass('horizontal-navigation') || wind_.width() < 1200) {
        var sub_menu_arrow = $this.find('.sub-menu-arrow');
        sub_menu_arrow.toggleClass('rotate-in');
        $this.next('ul').stop().toggle(250);
        $this.parent('li').siblings().not($this.parent('li')).find('ul').hide(250);
        $this.next('ul').find('li>ul').hide('open');
        $this.next('ul').find('li>a').find('.sub-menu-arrow').removeClass('rotate-in');
        $this.parent('li').siblings().not($this.parent('li').find('ul')).find('>a').find('.sub-menu-arrow').removeClass('rotate-in');
        setTimeout(function () {
          $('.navigation .navigation-menu-body').getNiceScroll().resize();
        }, 300);
      }

      return false;
    }
  }); // ----------------------------------
  // Fullscreen

  $(document).on('click', '[data-toggle="fullscreen"]', function () {
    $(this).toggleClass('active-fullscreen');

    if (document.fullscreenEnabled) {
      if ($(this).hasClass("active-fullscreen")) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else {
      alert("Your browser does not support fullscreen.");
    }

    return false;
  }); // ----------------------------------
  // Overlay close event

  $(document).on('click', '.overlay', function () {
    $.removeOverlay();
    $('.navigation').removeClass('open');
    $('.app-block .app-sidebar.show').removeClass('show');
  }); // ----------------------------------
  // Sidebar open

  $(document).on('click', '[data-sidebar-target]', function () {
    var target = $(this).data('sidebar-target');
    $('body').addClass('no-scroll');
    $('.sidebar-group').addClass('show');
    $('.sidebar-group .sidebar').removeClass('show');
    $('.sidebar-group .sidebar' + target).addClass('show');

    if ($('.sidebar-group').hasClass('show')) {
      $('.sidebar-group .sidebar' + target).niceScroll();
    } else {
      $('.sidebar-group .sidebar' + target).getNiceScroll().remove();
    }

    return false;
  }); // ----------------------------------
  // Sidebar close

  $(document).on('click', '.sidebar-group', function (e) {
    if ($(e.target).is($('.sidebar-group'))) {
      $('.sidebar-group').removeClass('show');
      $('body').removeClass('no-scroll');
      $('.sidebar-group .sidebar').removeClass('show');
      $('.sidebar-group .sidebar').getNiceScroll().remove();
    }
  }); // ----------------------------------
  // Preloader close

  wind_.on('load', function () {
    $('.preloader').fadeOut(500);
  }); // ----------------------------------

  wind_.on('load', function () {
    setTimeout(function () {
      $('.navigation .navigation-menu-body ul li a').each(function () {
        var $this = $(this);

        if ($this.next('ul').length) {
          $this.append('<i class="sub-menu-arrow fa fa-caret-right"></i>');
        }
      });
      $('.navigation .navigation-menu-body ul li.open>a>.sub-menu-arrow').addClass('rotate-in');
      $('body.horizontal-navigation .horizontal-navigation ul li a').each(function () {
        var $this = $(this);

        if ($this.next('ul').length) {
          $this.append('<i class="sub-menu-arrow fa fa-caret-right"></i>');
        }
      });
    }, 200);
  });
  $(document).on('click', '.navigation-toggler a', function () {
    $.createOverlay();
    $('.navigation').toggleClass('open');
    return false;
  });
  $(document).on('click', '.navigation .navigation-header a.small-navigation-toggler', function () {
    body_.toggleClass('small-navigation');
    return false;
  });
  $(document).on('click', '.navigation .navigation-header a.navigation-close-btn', function () {
    $.removeOverlay();
    $('.navigation').removeClass('open');
    return false;
  });
  $(document).on('click', '.header-toggler a', function () {
    $('.header .header-right').toggleClass('open');
    return false;
  });
  $(document).on('click', '*', function (e) {
    if (!$(e.target).is($('.navigation, .navigation *, .navigation-toggler *')) && body_.hasClass('navigation-toggle-one')) {
      body_.removeClass('navigation-show');
    }
  });
  $(document).on('click', '*', function (e) {
    if (!$(e.target).is('.header ul.navbar-nav, .header ul.navbar-nav *, .header-toggler, .header-toggler *')) {
      $('.header .header-right').removeClass('open');
    }
  }); // Open header search bar

  $(document).on('click', '[data-toggle="search"], [data-toggle="search"] *', function () {
    $('.header .header-right .header-search').show().find('.form-control').focus();
    return false;
  }); // ----------------------------------
  // Close header search bar

  $(document).on('click', '.close-header-search, .close-header-search svg', function () {
    $('.header .header-right .header-search').hide();
    return false;
  }); // ----------------------------------
  // Close header search bar

  $(document).on('click', '*', function (e) {
    if (!$(e.target).is($('.header, .header *, [data-toggle="search"], [data-toggle="search"] *'))) {
      $('.header .header-right .header-search').hide();
    }
  }); // ----------------------------------
  // Custom accordion

  $(document).on('click', '.accordion.custom-accordion .accordion-row a.accordion-header', function () {
    var $this = $(this);
    $this.closest('.accordion.custom-accordion').find('.accordion-row').not($this.parent()).removeClass('open');
    $this.parent('.accordion-row').toggleClass('open');
    return false;
  }); // Table dropdown bug

  var dropdownMenu,
      table_responsive = $('.table-responsive');
  table_responsive.on('show.bs.dropdown', function (e) {
    dropdownMenu = $(e.target).find('.dropdown-menu');
    body_.append(dropdownMenu.detach());
    var eOffset = $(e.target).offset();
    dropdownMenu.css({
      'display': 'block',
      'top': eOffset.top + $(e.target).outerHeight(),
      'left': eOffset.left,
      'width': '184px',
      'font-size': '14px'
    });
    dropdownMenu.addClass("mobPosDropdown");
  });
  table_responsive.on('hide.bs.dropdown', function (e) {
    $(e.target).append(dropdownMenu.detach());
    dropdownMenu.hide();
  }); // ----------------------------------

  /*------------- Mobile chat sidebar -------------*/

  $(document).on('click', '.chat-block .chat-sidebar .chat-sidebar-content .list-group .list-group-item', function () {
    $('.chat-block .chat-content').addClass('chat-mobile-open');
    return false;
  });
  /*------------- Mobile chat sidebar close btn -------------*/

  $(document).on('click', '.chat-block .chat-content .mobile-chat-close-btn a', function () {
    $('.chat-block .chat-content').removeClass('chat-mobile-open');
    return false;
  });
  $(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget),
        recipient = button.data('whatever'),
        modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
  });
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  });
  $('[data-toggle="popover"]').popover();
  $('.carousel').carousel();
  $(document).on('click', '.btn-mobile-search a', function () {
    $('.header .header-search-form').addClass('show');
    setTimeout(function () {
      $('.header .header-search-form .form-control').focus();
    }, 500);
    return false;
  });
  $(document).on('click', '.header-search-close-btn', function () {
    $('.header .header-search-form').removeClass('show');
    return false;
  });
  $(document).on('click', '.header .header-search-form', function (e) {
    if (!$(e.target).is($('form *'))) {
      $('.header .header-search-form').removeClass('show');
    }

    return false;
  });

  if (wind_.width() >= 992) {
    $('.card-scroll').niceScroll();
    $('.dropdown-scroll').niceScroll();
    $('.table-responsive').niceScroll();
    $('.app-block .app-content .app-lists').niceScroll();
    $('.app-block .app-sidebar .app-sidebar-menu').niceScroll();
    $('.chat-block .chat-sidebar .chat-sidebar-content').niceScroll();
    var chat_messages = $('.chat-block .chat-content .messages');

    if (chat_messages.length) {
      chat_messages.niceScroll({
        horizrailenabled: false
      });
      chat_messages.getNiceScroll(0).doScrollTop(chat_messages.get(0).scrollHeight, -1);
    }
  }

  $(document).on('mouseenter', 'body.small-navigation .navigation', function () {
    if (!body_.hasClass('horizontal-navigation') && wind_.width() >= 992) {
      var nice = $(this).find('.navigation-menu-body').niceScroll();
      $(nice.rail[0]).addClass("navigation-nicescroll");
    }
  });
  $(document).on('mouseleave', 'body.small-navigation .navigation', function () {
    $('.navigation-menu-body ul li ul').removeAttr('style');
    $(this).find('.navigation-menu-body').getNiceScroll().remove();
  });

  if (!body_.hasClass('small-navigation') && !body_.hasClass('horizontal-navigation') && wind_.width() >= 992) {
    var nice = $('.navigation .navigation-menu-body').niceScroll();
    $(nice.rail[0]).addClass("navigation-nicescroll");
  }

  if (!body_.hasClass('horizontal-navigation') && wind_.width() >= 992) {
    var nice2 = $('.navigation .navigation-menu-tab').niceScroll();
    $(nice2.rail[0]).addClass("navigation-nicescroll");
  }
})(jQuery);

/***/ }),

/***/ 0:
/*!*****************************************************************!*\
  !*** multi ./resources/js/app.js ./public/assets/sass/app.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\wamp64\www\themeforest\baston\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\wamp64\www\themeforest\baston\public\assets\sass\app.scss */"./public/assets/sass/app.scss");


/***/ })

/******/ });