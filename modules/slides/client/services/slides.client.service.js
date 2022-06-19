(function () {
  'use strict';
  angular
    .module('slides')
    .factory('Slides', Slides);
    Slides.$inject = ['$resource'];
  function Slides($resource) {
    var Slides = $resource('/api/slides/:slideId', {
      slideId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Slides;

  }
}());
