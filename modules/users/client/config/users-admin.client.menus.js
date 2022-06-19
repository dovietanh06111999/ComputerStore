(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Danh sách người dùng',
      state: 'admin.users'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Danh sách khách hàng',
      state: 'admin.customers'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Thêm mới người dùng',
      state: 'admin.user-create'
    });
  }
}());
