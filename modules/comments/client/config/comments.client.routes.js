(function () {
  'use strict';

  angular
    .module('comments')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createComment', {
        url: '/comments/create',
        templateUrl: '/modules/comments/client/views/create-comment.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('listComments', {
        url: '/comments/list',
        templateUrl: '/modules/comments/client/views/list-comments.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('editComment', {
        url: '/comments/:commentId',
        templateUrl: '/modules/comments/client/views/edit-comment.client.view.html',
        data: {
          roles: ['admin']
        },
      });
  }

}());
