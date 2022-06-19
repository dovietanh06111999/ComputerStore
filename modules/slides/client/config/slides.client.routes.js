(function () {
  'use strict';

  angular
    .module('slides')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createSlide', {
        url: '/slides/create',
        templateUrl: '/modules/slides/client/views/create-slide.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('listSlides', {
        url: '/slides/list',
        templateUrl: '/modules/slides/client/views/list-slides.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('editSlide', {
        url: '/slides/:slideId',
        templateUrl: '/modules/slides/client/views/edit-slide.client.view.html',
        data: {
          roles: ['admin']
        },
      });
  }

}());
