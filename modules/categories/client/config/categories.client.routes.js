(function () {
  'use strict';

  angular
    .module('categories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createCategory', {
        url: '/categories/create',
        templateUrl: '/modules/categories/client/views/create-category.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('listCategories', {
        url: '/categories/list',
        templateUrl: '/modules/categories/client/views/list-categories.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('editCategory', {
        url: '/categories/:categoryId',
        templateUrl: '/modules/categories/client/views/edit-category.client.view.html',
        data: {
          roles: ['admin']
        },
      });
  }

}());
