/*
 * Using:
 *
 * $.fn.resizeBoundary.addBoundary({from: fromPx, to: toPx}, cb); - cb will be called once when window size become in fromPx, toPx boundary
 * $.fn.resizeBoundary.matchBoundaries() - call boundary cb based on current window width
 *
 * Copyright (c) 2016 Oleh Birjukov
 * Licensed under the MIT license.
 */
(function () {
  var jQueryHelper = (function ($) {
    var $window = $(window);

    return {
      extend: function () {
        return $.extend.apply(this, arguments);
      },
      ready: function (cb) {
        $(document).ready(cb);
      },
      getWindowWidth: function () {
        return $window.width();
      },
      resize: function (cb) {
        $window.resize(cb);
      },
      register: function (publicFunctions) {
        $.fn.extend({
          resizeBoundary: publicFunctions
        });
      }
    };
  })(jQuery);

  /*
   helper {
		extend: function(object1, object2, ..) - extend objects
		ready: function(cb) - cb on document ready
		getWindowWidth: function() - get window width
		resize: function(cb) - cb on windows resize
		register: function(publicFunctions) - register plugin
	}
   */
  (function (helper) {
    var defaultParams = {
      from: 0,
      to: 99999999999 //TODO not the best idea
    };

    var boundaries = [];

    var Boundary = function (from, to, cb, destroyCb) {
      this.from = from;
      this.to = to;
      this.cb = cb;
      this.destroyCb = destroyCb;

      this._isInRange = function (x) {
        return this.from <= x && x <= this.to;
      };

      this.apply = function (prevWidth, newWidth) {
        var isEnter = this._isInRange(newWidth) && !this._isInRange(prevWidth),
            isLeave = !this._isInRange(newWidth) && this._isInRange(prevWidth);

        if (isEnter) {
          this.cb.call();
        }

        if (isLeave && this.destroyCb) {
          this.destroyCb.call();
        }
      };

      this.match = function(width) {
        if (this.from <= width && width < this.to) {
          this.cb.call();
        }
      };
    };

    var windowWidth = (function () {
      var windowWidth = 0;

      var updateWindowWidth = function () {
        windowWidth = helper.getWindowWidth();
        return publicFunctions;
      };

      var publicFunctions = {
        update: updateWindowWidth,
        get: function () {
          return windowWidth;
        }
      };

      helper.ready(updateWindowWidth);

      return publicFunctions;
    })();

    helper.resize(function () {
      var prevWidth = windowWidth.get(),
        newWidth = windowWidth.update().get();

      boundaries.forEach(function (boundary) {
        boundary.apply(prevWidth, newWidth);
      });
    });

    var addResizeBoundary = function (params, cb, destroyCb) {
      var options = helper.extend({}, defaultParams, params);

      boundaries.push(new Boundary(options.from, options.to, cb, destroyCb));

      return publicFunctions;
    };

    var matchBoundaries = function() {
      var width = windowWidth.update().get();

      boundaries.forEach(function (boundary) {
        boundary.match(width);
      });
    };

    var publicFunctions = {
      addBoundary: addResizeBoundary,
      matchBoundaries: matchBoundaries
    };

    helper.register(publicFunctions);
  })(jQueryHelper);
})();
