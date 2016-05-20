// jshint ignore: start

(function ($) {
  module('jQuery.resizeBoundary');

  test('is resizeBoundary initialized', function () {
    propEqual($.fn.resizeBoundary, {
      addBoundary: {},
      matchBoundaries: {}
    }, 'should be resizeBoundary initialized');
  });

}(jQuery));
