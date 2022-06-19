(function () {
  'use strict';
  angular
    .module('posts')
    .factory('Posts', Posts);
    Posts.$inject = ['$resource'];
  function Posts($resource) {
    var Posts = $resource('/api/posts/:postId', {
      postId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Posts;

  }
}());
