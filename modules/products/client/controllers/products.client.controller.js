(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Products','Categories', '$http', 'NgTableParams', "$filter", "ConfirmModal"];

  function ProductsController($scope, $state, $location, Authentication, Notification, Products, Categories,$http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    // vm.product = {
    //   images : []
    // }
    vm.init = () => {
      Products.query((data) => {
        console.log(data);
        vm.products = data
        _.forEach(vm.products, (product) => {
          product.createdAt = moment(product.createdAt).format("LT - L");
          
        })
        vm.productTable = new NgTableParams({}, { dataset: vm.products })
      });
    }

    // vm.addImage = (keyEvent) => {
    //   if (keyEvent.which === 13){
    //     vm.product.images.push(vm.image)
    //     vm.image = ''
    //   }
        
    // }
    
    // vm.removeValueFromArray = function (array, index) {
    //   array.splice(index, 1)
    // }

    // vm.getCategories = () =>{
    //   Categories.query((data) =>{
    //     console.log(data);
    //   })
    //   console.log(1);
    // }
//

vm.getCategories = () => {
  Categories.query((data) => {
    console.log(data);
    vm.categories = data
  });
}
    

    vm.create = () => {
      
      const product = new Products(vm.product)
      if(!product.name||!product.categoryId||!product.image||!product.detail||!product.description||!product.proPrice||!product.discount||!product.quantity){
        return Notification.error({ message: 'Bạn chưa điền đủ thông tin', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      product.price = product.proPrice-product.proPrice*product.discount/100
      return product
        .$save()
        .then(() => {
          $location.path('/products/create')
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tạo sản phẩm thành công!' });
          $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        })
        .finally(() => {

        })
    }

    vm.findOne = () => {
      console.log($state.params.productId);
      Products.get({
        productId: $state.params.productId
      }, (data) => {
        vm.product = data
      })
    }

    vm.update = () => {
      vm.product.price = vm.product.proPrice-vm.product.proPrice*vm.product.discount/100
      vm.product
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật sản phẩm thành công!' });
          $state.go('listProducts')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,product) => {
      console.log(product);
      ConfirmModal.show(
        {},
        {
          headerText: `Xóa Sản Phẩm ?`,
          bodyText: `Bạn có chắc chắn muốn xóa sản phẩm: ${product.name}?`,
        }
      ).then(() => {
        product
          .$remove()
          .then(() => {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xóa sản phẩm thành công!' });
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
