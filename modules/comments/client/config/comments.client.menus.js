(function () {
  'use strict';

  angular
    .module('comments')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Bình luận',
      state: 'comments',
      type: 'dropdown',
      roles: ['admin']
    });
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'comments', {
      title: 'Danh sách Bình luận',
      state: 'listComments',
      roles: ['*']
    });
    
  }
}());
