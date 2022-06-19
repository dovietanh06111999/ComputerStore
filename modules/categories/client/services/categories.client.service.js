(function () {
  'use strict';
  angular
    .module('categories')
    .factory('Categories', Categories);
    Categories.$inject = ['$resource'];
  function Categories($resource) {
    var Categories = $resource('/api/categories/:categoryId', {
      categoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Categories;

  }
}());
