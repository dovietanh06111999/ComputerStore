(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersController', OrdersController);

    OrdersController.$inject = ['$scope','$window', '$state', '$location', 'Authentication', 'Notification', 'Orders', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function OrdersController($scope,$window, $state, $location, Authentication, Notification, Orders, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.cartTable = new NgTableParams({ count: 50 })

    vm.show = ()=>{
      if (vm.typeTime==='month') {
       vm.start = moment(vm.startMonth).startOf('month').startOf('day').toDate()
       vm.end = moment(vm.endMonth).endOf('month').endOf('day').toDate()
      } else{
        vm.start = moment(vm.startDate).startOf('day').toDate()
        vm.end = moment(vm.endDate).endOf('day').toDate()
      }
      vm.revenueOrders = Orders.query({
        status : "done",
        startDate : vm.start,
        endDate: vm.end,
      })
      vm.revenueOrders.$promise.then(() => {
        vm.summaryRevenue = 0
        _.forEach(vm.revenueOrders, (order) => {
          order.totalPrice = 0 
          order.totalProduct = 0 
          order.createdAt = moment(order.createdAt).format("LT L");
          _.forEach(order.orderDetails,(item)=>{

            order.totalPrice += item.buyQuantity*item.productId.price
            order.totalProduct += item.buyQuantity
          })
          vm.summaryRevenue +=  order.totalPrice
        })
        
        vm.revenueOrdersTable = new NgTableParams({}, { dataset: vm.revenueOrders })
      });    
    }


    vm.getStatus = () => [
      {
        id: 'pending',
        title: 'Đang xử lý',
      },
      {
        id: 'shipping',
        title: 'Đang giao hàng',
      },
      {
        id: 'done',
        title: 'Hoàn thành',
      },
      {
        id: 'deleted',
        title: 'Đã hủy',
      },
    ]
    vm.showOrderHistory = () => {
      Orders.query((data) => {
        vm.orders = data
        // _.forEach(vm.orders, (order) => {
        //   // if(!order.customerId){
        //   //   order.customerId=""
        //   // }
          
        // })
        vm.orders = _.filter(vm.orders, (order)=>{
          return order.customerId
         })

        vm.orders = _.filter(vm.orders, (order)=>{
          return order.customerId.toString()===vm.authentication.user.id.toString()
         })
         console.log(vm.orders);
        _.forEach(vm.orders, (order) => {
          order.totalPrice = 0
          if(order.status ==='pending'){
            order.vnStatus = 'Đang xử lý'
          }else if (order.status ==='shipping') {
            order.vnStatus = 'Đang giao hàng'
          }else if (order.status ==='done') {
            order.vnStatus = 'Hoàn thành'
          }else if (order.status ==='deleted') {
            order.vnStatus = 'Đã hủy'
          }
          
          order.createdAt = moment(order.createdAt).format("LT L");
          _.forEach(order.orderDetails,(item)=>{

            order.totalPrice += item.buyQuantity*item.productId.price
          })
        })
        vm.orderTableHistory = new NgTableParams({}, { dataset: vm.orders })
        console.log(vm.orders);
      });
    }

    vm.init = () => {
      Orders.query((data) => {
        console.log(data);
        vm.orders = data
        _.forEach(vm.orders, (order) => {
          order.totalPrice = 0
          if(order.status ==='pending'){
            order.vnStatus = 'Đang xử lý'
          }else if (order.status ==='shipping') {
            order.vnStatus = 'Đang giao hàng'
          }else if (order.status ==='done') {
            order.vnStatus = 'Hoàn thành'
          }else if (order.status ==='deleted') {
            order.vnStatus = 'Đã hủy'
          }
          
          order.createdAt = moment(order.createdAt).format("LT L");
          _.forEach(order.orderDetails,(item)=>{

            order.totalPrice += item.buyQuantity*item.productId.price
          })
        })
        vm.orderTable = new NgTableParams({}, { dataset: vm.orders })
        console.log(vm.orders);
      });
    }

    vm.create = () => {
      
      const order = new Orders(vm.order)
      if(order.name === null){
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bạn chưa nhập tên danh mục sản phẩm!' });
      }
      console.log(order);
      return order
        .$save()
        .then(() => {
          $location.path('/orders/create')
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
      console.log($state.params.orderId);
      Orders.get({
        orderId: $state.params.orderId
      }, (data) => {
        vm.order = data
        vm.totalPrice = 0
        _.forEach(vm.order.orderDetails,(item)=>{
          item.summary=item.productId.price*item.buyQuantity
          vm.totalPrice +=item.summary
        })
        console.log(vm.order.orderDetails);
        vm.cartTable.settings({ dataset: vm.order.orderDetails })
      })
    }

    vm.shipping = () => {
      vm.order
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Đơn hàng đã được giao cho đơn vị vận chuyển!' });
          $state.go('listOrders')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }
    vm.doneOrder = () => {
      vm.order
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Đơn hàng đã hoàn thành!' });
          if (vm.authentication.user.roles.include('user')) {
            $state.go('')
          }else{
            $state.go('listOrders')
          }
          
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.cancelOrder = () => {
      const confirm = $window.confirm(
        `Bạn chắc chắn muốn hủy đơn hàng này ?`
      )
      if (!confirm) {
        return
      }
      console.log('123');
      vm.order
      .$remove()
      .then(() => {
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Hủy đơn hàng thành công!' });
        $state.go('listOrders')
      })
      .catch(
        (err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        }
      )
    }

    vm.remove = (index,order) => {
      console.log(order);
      ConfirmModal.show(
        {},
        {
          headerText: `Xóa Chủ Đề ?`,
          bodyText: `Bạn có chắc chắn muốn xóa đơn hàng này ?`,
        }
      ).then(() => {
        order
          .$remove()
          .then(() => {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xóa đơn hàng thành công!' });
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
