'use strict';

/**
 * @ngdoc directive
 * @name xdojo.directive:collapsibleBox
 * @description
 * # collapsibleBox
 */
angular.module('xdojo')
  .directive('collapsibleBox', function () {
    return {
      restrict: 'A',
      link: function collapsibleBox(scope, element, attrs) {

        var toggle = function toggle() {
          var ibox = element.closest('div.ibox');
          var button = element.find('i');
          var content = ibox.find('div.ibox-content');
          content.slideToggle(200);
          button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
          ibox.toggleClass('').toggleClass('border-bottom');
          setTimeout(function () {
              ibox.resize();
              ibox.find('[id^=map-]').resize();
            }, 50);
        };

        var close = function() {
          var content = element.closest('div.ibox');
          content.remove();
        };

        element.click(function() {
          switch (attrs.collapsibleBox)
          {
            case 'toggle':
              toggle();
              break;
            case 'close':
              close();
              break;
          }
        });
      }
    };
  });
