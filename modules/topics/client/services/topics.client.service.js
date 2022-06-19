(function () {
  'use strict';
  angular
    .module('topics')
    .factory('Topics', Topics);
    Topics.$inject = ['$resource'];
  function Topics($resource) {
    var Topics = $resource('/api/topics/:topicId', {
      topicId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Topics;

  }
}());
