(function () {
  'use strict';

  angular
    .module('orders')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createOrder', {
        url: '/orders/create',
        templateUrl: '/modules/orders/client/views/create-order.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('listOrders', {
        url: '/orders/list',
        templateUrl: '/modules/orders/client/views/list-orders.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('revenueStatistic', {
        url: '/orders/revenue-statistic',
        templateUrl: '/modules/orders/client/views/revenue-statistic.client.view.html',
        data: {
          roles: ['admin']
        },
      })
      .state('orderHistory', {
        url: '/orders/history',
        templateUrl: '/modules/orders/client/views/order-history.client.view.html',
        data: {
          roles: ['user']
        },
      })
      .state('editOrder', {
        url: '/orders/:orderId',
        templateUrl: '/modules/orders/client/views/edit-order.client.view.html',
        data: {
          roles: ['admin','user']
        },
      })
      ;
  }

}());
