/*
 * metismenu - v1.1.2
 * Easy menu jQuery plugin for Twitter Bootstrap 3
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */
+function ($) {
  'use strict';

  // METISMENU CLASS DEFINITION
  // ======================
  var MetisMenu = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, MetisMenu.DEFAULTS, options)
    this.init()
  }

  MetisMenu.DEFAULTS = {
    toggle: true,
    doubleTapToGo: false
  }

  MetisMenu.prototype.init = function () {
    var $this = this.$element
    var $toggle = this.options.toggle
    var obj = this

    if (this.isIE() <= 9) {
      $this.find('li.active').has('ul').children('ul').collapse('show')
      $this.find('li').not('.active').has('ul').children('ul').collapse('hide')
    } else {
      $this.find('li.active').has('ul').children('ul').addClass('collapse in')
      $this.find('li').not('.active').has('ul').children('ul').addClass('collapse')
    }

    // add the 'doubleTapToGo' class to active items if needed
    if (obj.options.doubleTapToGo) {
      $this.find('li.active').has('ul').children('a').addClass('doubleTapToGo')
    }

    $this.find('li').has('ul').children('a').on('click.metisMenu', function (e) {
      e.preventDefault()

      // Do we need to enable the double tap
      if (obj.options.doubleTapToGo) {

        // if we hit a second time on the link and the href is valid, navigate to that url
        if (obj.doubleTapToGo($(this)) && $(this).attr('href') !== '#' && $(this).attr('href') !== '') {
          e.stopPropagation()
          document.location = $(this).attr('href')
          return
        }
      }

      $(this).parent('li').toggleClass('active').children('ul').collapse('toggle')

      if ($toggle) $(this).parent('li').siblings().removeClass('active').children('ul.in').collapse('hide')

    });
  }

  // https://gist.github.com/padolsey/527683
  MetisMenu.prototype.isIE = function () {
    var undef
    var v = 3
    var div = document.createElement('div')
    var all = div.getElementsByTagName('i')

    while (
      div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
      ) {
      return v > 4 ? v : undef
    }
  }

  // Enable the link on the second click.
  MetisMenu.prototype.doubleTapToGo = function (elem) {
    var $this = this.element

    // if the class 'doubleTapToGo' exists, remove it and return
    if (elem.hasClass('doubleTapToGo')) {
      elem.removeClass('doubleTapToGo')
      return true
    }

    // does not exists, add a new class and return false
    if (elem.parent().children('ul').length) {
      // first remove all other class
      $this.find('.doubleTapToGo').removeClass('doubleTapToGo')
      // add the class on the current element
      elem.addClass('doubleTapToGo')
      return false;
    }
  }

  MetisMenu.prototype.remove = function () {
    this.element.off('.metisMenu');
    this.element.removeData('metisMenu');
  }

  // METISMENU PLUGIN DEFINITION
  // =======================
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('metisMenu')
      var options = typeof  option == 'object' && option
      if (data) data.remove()
      if (!data) $this.data('metisMenu', (data = new MetisMenu(this, options)))
    })
  }

  var old = $.fn.metisMenu

  $.fn.metisMenu = Plugin
  $.fn.metisMenu.Constructor = MetisMenu

  // METISMENU NO CONFLICT
  // =================
  $.fn.metisMenu.noConflict = function () {
    $.fn.metisMenu = old
    return this
  }

  // METISMENU DATA-API
  // ==============
  $(window).on('load.metisMenu.data-api', function () {
    $('[data-toggle="metisMenu"]').each(function () {
      var $this = $(this)
      Plugin.call($this, $this.data())
    })
  })
}(jQuery);
