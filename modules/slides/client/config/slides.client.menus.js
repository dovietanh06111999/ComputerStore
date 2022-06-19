(function () {
  'use strict';

  angular
    .module('slides')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Slide',
      state: 'slides',
      type: 'dropdown',
      roles: ['admin']
    });
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'slides', {
      title: 'Danh sách slide',
      state: 'listSlides',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'slides', {
      title: 'Thêm mới slide',
      state: 'createSlide',
      roles: ['*']
    });
    
  }
}());
