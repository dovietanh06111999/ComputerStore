(function () {
  'use strict';

  angular
    .module('products')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createProduct', {
        url: '/products/create',
        templateUrl: '/modules/products/client/views/create-product.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('listProducts', {
        url: '/products/list',
        templateUrl: '/modules/products/client/views/list-products.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('editProduct', {
        url: '/products/:productId',
        templateUrl: '/modules/products/client/views/edit-product.client.view.html',
        data: {
          roles: ['admin']
        },
      });
  }

}());
