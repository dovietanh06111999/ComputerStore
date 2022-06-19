(function () {
  'use strict';

  angular
    .module('topics')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createTopic', {
        url: '/topics/create',
        templateUrl: '/modules/topics/client/views/create-topic.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('listTopics', {
        url: '/topics/list',
        templateUrl: '/modules/topics/client/views/list-topics.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('editTopic', {
        url: '/topics/:topicId',
        templateUrl: '/modules/topics/client/views/edit-topic.client.view.html',
        data: {
          roles: ['admin']
        },
      });
  }

}());
