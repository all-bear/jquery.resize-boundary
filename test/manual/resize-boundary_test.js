// jshint ignore: start

(function ($) {
  var messageHolder,
      currentWidthHolder,
      $window;

  function updateInicators() {
    currentWidthHolder.html($window.width());
  }

  function log(msg) {
    messageHolder.append($('<div>').html(msg + ' on width ' + $window.width()));
  }

  function init()
  {
    messageHolder = $('#current_message');
    currentWidthHolder = $('#current_width');
    $window = $(window);

    $window.resize(function () {
      updateInicators();
    });

    updateInicators();

    [
      {to: 420},
      {from: 420, to: 840},
      {from: 840}
    ].forEach(function (params) {
      $.fn.resizeBoundary.addBoundary(params, function () {
        log('In ' + params.from + ' - ' + params.to);
      }, function () {
        log('Out ' + params.from + ' - ' + params.to);
      })
    });

    $.fn.resizeBoundary.matchBoundaries();
  }

  $(document).ready(function () {
    init();
  });

}(jQuery));
