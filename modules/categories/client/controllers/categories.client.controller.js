(function () {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Categories', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function CategoriesController($scope, $state, $location, Authentication, Notification, Categories, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;

    vm.init = () => {
      Categories.query((data) => {
        console.log(data);
        vm.categories = data
        _.forEach(vm.categories, (category) => {
          category.createdAt = moment(category.createdAt).format("LT L");
          
        })
        vm.categoryTable = new NgTableParams({}, { dataset: vm.categories })
      });
    }

    vm.create = () => {
      
      const category = new Categories(vm.category)
      if(category.name === null){
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bạn chưa nhập tên danh mục sản phẩm!' });
      }
      console.log(category);
      return category
        .$save()
        .then(() => {
          $location.path('/categories/create')
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tạo chủ đề thành công!' });
          $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        })
        .finally(() => {

        })
    }

    vm.findOne = () => {
      console.log($state.params.categoryId);
      Categories.get({
        categoryId: $state.params.categoryId
      }, (data) => {
        vm.category = data
      })
    }

    vm.update = () => {
      console.log('vm.category');
      vm.category
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật chủ đề thành công!' });
          $state.go('listCategories')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,category) => {
      console.log(category);
      ConfirmModal.show(
        {},
        {
          headerText: `Xóa Chủ Đề ?`,
          bodyText: `Bạn có chắc chắn muốn xóa chủ đề: ${category.name}?`,
        }
      ).then(() => {
        category
          .$remove()
          .then(() => {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xóa chủ đề thành công!' });
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
