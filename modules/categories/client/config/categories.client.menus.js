(function () {
  'use strict';

  angular
    .module('categories')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Danh mục sản phẩm',
      state: 'categories',
      type: 'dropdown',
      roles: ['admin']
    });
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'categories', {
      title: 'Danh sách danh mục sản phẩm',
      state: 'listCategories',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'categories', {
      title: 'Thêm mới danh mục sản phẩm',
      state: 'createCategory',
      roles: ['*']
    });
    
  }
}());
