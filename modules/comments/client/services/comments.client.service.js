(function () {
  'use strict';
  angular
    .module('comments')
    .factory('Comments', Comments);
    Comments.$inject = ['$resource'];
  function Comments($resource) {
    var Comments = $resource('/api/comments/:commentId', {
      commentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Comments;

  }
}());
