(function () {
  'use strict';
  angular
    .module('orders')
    .factory('Orders', Orders);
    Orders.$inject = ['$resource'];
  function Orders($resource) {
    var Orders = $resource('/api/orders/:orderId', {
      orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Orders;

  }
}());
