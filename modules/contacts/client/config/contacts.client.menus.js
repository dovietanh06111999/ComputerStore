(function () {
  'use strict';

  angular
    .module('contacts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Liên hệ',
      state: 'contacts',
      type: 'dropdown',
      roles: ['admin']
    });
    
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'contacts', {
      title: 'Danh sách liên hệ',
      state: 'listContacts',
      roles: ['*']
    });
    // menuService.addSubMenuItem('topbar', 'contacts', {
    //   title: 'Thêm mới liên hệ',
    //   state: 'createContact',
    //   roles: ['*']
    // });
    
  }
}());
