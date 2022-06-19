(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService','NgTableParams', '$http','Authentication','ConfirmModal','Notification'];

  function UserListController($scope, $filter, AdminService,NgTableParams, $http,Authentication,ConfirmModal,Notification) {
    const vm = this;
    vm.user = Authentication.user
    // vm.buildPager = buildPager;
    // vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    // vm.pageChanged = pageChanged;

    AdminService.query(function (data) {
      
      vm.users = data;
      console.log(vm.users);
      vm.userTable = new NgTableParams({}, { dataset: vm.users});  
    });
    console.log(vm.users);
    vm.remove = (user) => {
      ConfirmModal.show(
        ).then(() => {
          user
            .$remove()
            .then(() => {
              Notification.success(`Xóa người dùng thành công`)
              $state.reload()
            })
            .catch(
              (err) => {
                Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
              }
            )
        })
    }
    // function buildPager() {
    //   vm.pagedItems = [];
    //   vm.itemsPerPage = 15;
    //   vm.currentPage = 1;
    //   vm.figureOutItemsToDisplay();
    // }

    // function figureOutItemsToDisplay() {
    //   vm.filteredItems = $filter('filter')(vm.users, {
    //     $: vm.search
    //   });
    //   vm.filterLength = vm.filteredItems.length;
    //   var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
    //   var end = begin + vm.itemsPerPage;
    //   vm.pagedItems = vm.filteredItems.slice(begin, end);
    // }

    // function pageChanged() {
    //   vm.figureOutItemsToDisplay();
    // }
  }
}());
