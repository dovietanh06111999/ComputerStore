(function () {
  'use strict';

  angular
    .module('orders')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Đơn hàng',
      state: 'orders',
      type: 'dropdown',
      roles: ['admin','user']
    });
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'orders', {
      title: 'Danh sách đơn hàng',
      state: 'listOrders',
      roles: ['admin']
    });
    menuService.addSubMenuItem('topbar', 'orders', {
      title: 'Thống kê doanh thu',
      state: 'revenueStatistic',
      roles: ['admin']
    });
    menuService.addSubMenuItem('topbar', 'orders', {
      title: 'Lịch sử mua hàng',
      state: 'orderHistory',
      roles: ['user']
    });
  }
}());
