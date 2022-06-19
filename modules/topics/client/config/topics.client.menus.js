(function () {
  'use strict';

  angular
    .module('topics')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Chủ đề',
      state: 'topics',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'topics', {
      title: 'Danh sách chủ đề',
      state: 'listTopics',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'topics', {
      title: 'Thêm mới chủ đề',
      state: 'createTopic',
      roles: ['*']
    });
    
  }
}());
