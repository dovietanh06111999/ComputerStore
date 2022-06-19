(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope','$stateParams', '$state','$window', 'Authentication', 'menuService','Categories','$location','$http','NgTableParams','$rootScope','Products'];

  function HeaderController($scope,$stateParams, $state,$window, Authentication, menuService,Categories,$location,$http,NgTableParams,$rootScope,Products) {
    var vm = this;
    vm.cart=[]
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.productTable = new NgTableParams({ count: 50 })
    vm.getCategories = () => {
      let storage = $window.localStorage.getItem('cart')
      if (storage) {
        vm.cart = JSON.parse(storage)
      }
      console.log(vm.cart.length);
      Categories.query((data) => {
        vm.categories = data
      });
    }
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    ///
    vm.viewShoppingCart = () =>{
      $location.path('/shopping-cart')
    }
    // vm.search = () =>{
    //   $location.path('/list-products')
    //   $http
    //     .get('/products/get-products-by-keyword', {
    //       params: {
    //         keyword: vm.keyword ? vm.keyword :'',
    //       },
    //     })
    //     .then(({ data }) => {
    //       $rootScope.$broadcast('greeting', data);
    //     })
    //     .catch((err) => {
    //       return console.log('lỗi');
    //     })
    //     .finally(() => {
    //       // vm.waiting = false
    //     })
    // }

    vm.search = () =>{
      $window.localStorage.removeItem('keyword');
      $window.localStorage.setItem('keyword', JSON.stringify(vm.keyword ? vm.keyword :''))
      $http
        .get('/products/get-products-by-keyword', {
          params: {
            keyword: vm.keyword ? vm.keyword :'',
          },
        })
        .then(({ data }) => {
          $window.localStorage.removeItem('products');
          $window.localStorage.setItem('products', JSON.stringify(data))
          if ($location.path()==='/list-products') {
            $state.reload()
          } else{
            $location.path('/list-products')
          }
          
        })
        .catch((err) => {
          return console.log('lỗi');
        })
        .finally(() => {
          // vm.waiting = false
        })
    }
    vm.findProductsByCategory = (category)=>{
      $window.localStorage.removeItem('categoryName');
      $window.localStorage.setItem('categoryName', JSON.stringify(category.name))
      console.log(category);
      Products.query((data) => {
        vm.productsFindByCategory = _.filter(data,(product)=>{
          return product.categoryId._id === category._id
        })
        console.log(vm.productsFindByCategory);
        $window.localStorage.removeItem('productsFindByCategory');
        $window.localStorage.setItem('productsFindByCategory', JSON.stringify(vm.productsFindByCategory))
        if ($location.path()==='/find-products-by-cate') {
          $state.reload()
        } else{
          $location.path('/find-products-by-cate')
        }
      });
    }
    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }

}());
