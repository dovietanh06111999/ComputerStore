(function () {
  'use strict';

  angular
    .module('posts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Bài đăng',
      state: 'posts',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'posts', {
      title: 'Danh sách bài đăng',
      state: 'listPosts',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'posts', {
      title: 'Thêm mới bài đăng',
      state: 'createPost',
      roles: ['*']
    });
    
  }
}());
