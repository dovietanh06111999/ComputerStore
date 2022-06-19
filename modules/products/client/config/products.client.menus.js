(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Sản phẩm',
      state: 'products',
      type: 'dropdown',
      roles: ['admin']
    });
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'products', {
      title: 'Danh sách sản phẩm',
      state: 'listProducts',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'products', {
      title: 'Thêm mới sản phẩm',
      state: 'createProduct',
      roles: ['*']
    });
    
  }
}());
