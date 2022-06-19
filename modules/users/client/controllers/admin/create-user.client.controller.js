(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserCreateController', UserCreateController);

  UserCreateController.$inject = ['$scope', '$state', 'NgTableParams','$window', 'Authentication', 'Notification', 'AdminService'];

  function UserCreateController($scope, $state,NgTableParams, $window, Authentication, Notification,  AdminService) {
    const vm = this;
    vm.authentication = Authentication;
    vm.user = {};
    vm.findCustomer = ()=>{
      AdminService.query((data) => {
      const users = _.filter(data,(user)=>{
        return  user.roles.includes('user')
        // ['user'].includes(user.roles)
      })
      console.log(data);
      console.log(users);
        vm.userTable = new NgTableParams({}, { dataset: users })
      });

      
      vm.userTable = new NgTableParams({}, { dataset: vm.users});  
    }
    vm.create = () => {
      if(vm.authentication.user.roles.includes('manager')){
        vm.user.roles = ['user'];
      }
     
      if(!vm.user.lastName||!vm.user.firstName||!vm.user.email||!vm.user.username||!vm.user.password||!vm.user.address||!vm.user.phone||!vm.user.gender){
        return Notification.error({ message: 'Bạn chưa điền đủ thông tin', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      
      var regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (regexPhone.test(vm.user.phone) == false) 
      {
        return  alert('Số điện thoại của bạn không đúng định dạng!');
      }
      var regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if (regexEmail.test(vm.user.email) == false) 
          {
            return  alert('email của bạn không đúng định dạng!');
          }
      console.log(vm.user);
      const user = new AdminService(vm.user);
      user.$save()
        .then(() => {
          Notification.success(`Tạo tài khoản thành công`)
          vm.user = {}
          // $state.go('listUsers')
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        });
    }
  }
}());
