(function () {
    'use strict';
  
    angular
      .module('posts')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      $stateProvider
        .state('createPost', {
          url: '/posts/create',
          templateUrl: '/modules/posts/client/views/create-post.client.view.html',
          data: {
            roles: ['admin']
          },
        })
        .state('listPosts', {
          url: '/posts/list',
          templateUrl: '/modules/posts/client/views/list-posts.client.view.html',
          data: {
            roles: ['admin']
          },
        })
        .state('editPost', {
          url: '/posts/:postId',
          templateUrl: '/modules/posts/client/views/edit-post.client.view.html',
          data: {
            roles: ['admin']
          },
        });
    }
  
  }());
  