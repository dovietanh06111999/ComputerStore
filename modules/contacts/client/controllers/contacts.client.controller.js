(function () {
    'use strict';
  
    angular
      .module('contacts')
      .controller('ContactsController', ContactsController);
  
      ContactsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Contacts', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];
  
    function ContactsController($scope, $state, $location, Authentication, Notification, Contacts, $http, NgTableParams, $filter, ConfirmModal) {
      const vm = this;
      vm.authentication = Authentication;
  
      vm.init = () => {
        Contacts.query((data) => {
          console.log(data);
          vm.contacts = data
          // _.forEach(vm.contacts, (contact) => {
          //   contact.createdAt = moment(contact.createdAt).format("L");
            
          // })
          vm.contactTable = new NgTableParams({}, { dataset: vm.contacts })
        });
      }
  
      vm.create = () => {
        
        const contact = new Contacts(vm.contact)
        // if(contact.name === null){
        //   Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bạn chưa nhập tên danh mục sản phẩm!' });
        // }
        console.log(contact);
        return contact
          .$save()
          .then(() => {
            $location.path('/contacts/create')
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tạo liên hệ thành công!' });
            $state.reload()
          })
          .catch((err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          })
          .finally(() => {
  
          })
      }
  
      vm.findOne = () => {
        console.log($state.params.contactId);
        Contacts.get({
            contactId: $state.params.contactId
        }, (data) => {
          vm.contact = data
        })
      }
  
      vm.update = () => {
        console.log('vm.contact');
        vm.contact
          .$update()
          .then(() => {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật liên hệ thành công!' });
            $state.go('listContacts')
          })
          .catch(
            (err) => {
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
            }
          )
      }
  
      vm.remove = (index,contact) => {
        console.log(contact);
        ConfirmModal.show(
          {},
          {
            headerText: `Xóa Chủ Đề ?`,
            bodyText: `Bạn có chắc chắn muốn xóa chủ đề: ${contact.name}?`,
          }
        ).then(() => {
            contact
            .$remove()
            .then(() => {
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xóa liên hệ thành công!' });
              $state.reload()
            })
            .catch(
              (err) => {
                Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
              }
            )
        })
      }
    }
  }());
  