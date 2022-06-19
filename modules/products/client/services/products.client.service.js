(function () {
  'use strict';
  angular
    .module('products')
    .factory('Products', Products);
    Products.$inject = ['$resource'];
  function Products($resource) {
    var Products = $resource('/api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Products;

  }
}());
