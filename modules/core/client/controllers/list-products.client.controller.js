(function () {
    'use strict';

    angular
      .module('core')
      .controller('ListProductsController', ListProductsController);
  
    ListProductsController.$inject = ['$scope', '$state','Notification','Orders','Comments', 'Authentication','Posts','$location','$http','NgTableParams','$window','Products'];
  
    function ListProductsController($scope, $state,Notification,Orders,Comments, Authentication,Posts,$location,$http,NgTableParams,$window,Products) {
      var vm = this;
      // vm.user = Authentication.user
      vm.authentication = Authentication;
      vm.order = {}
      vm.summaryPrice = 0
      vm.cart = []
      vm.cartTable = new NgTableParams({ count: 50 })
      vm.contact = {}
      //
      // $scope.$on('greeting', listenGreeting)
      
      // function listenGreeting($event, data){
      //   vm.products = data
      //   vm.productTable.settings({ dataset: vm.products })
      // }
      vm.listProducts = ()=>{
        let storage1 = $window.localStorage.getItem('keyword')
        if (storage1) {
          vm.keyword = JSON.parse(storage1)
        }
        let storage2 = $window.localStorage.getItem('products')
        if (storage2) {
          vm.products = JSON.parse(storage2)
        }
      }
      vm.addToCart = (product) => {
        vm.product = product
        let storage = $window.localStorage.getItem('cart')
        if (storage) {
          vm.cart = JSON.parse(storage)
        }
        let item = _.find(vm.cart, { _id: vm.product._id })
        if (item) {
          if(vm.buyQuantity){
            item.buyQuantity = item.buyQuantity + vm.buyQuantity
          }else{
            item.buyQuantity += 1
          }
          alert('Đã thêm sản phẩm vào giỏ hàng')
        } else{
          if(vm.buyQuantity){
            vm.product.buyQuantity = vm.buyQuantity
          }else{
            vm.product.buyQuantity = 1
          }
          
          vm.cart.push(vm.product)
          alert('Đã thêm sản phẩm vào giỏ hàng')
        }
        _.forEach(vm.cart, (item)=>{
          item.totalPrice = item.buyQuantity * item.price
        })
        $window.localStorage.setItem('cart', JSON.stringify(vm.cart))
        
      }
      vm.showCart = () => {
        console.log(vm.authentication.user);
        if(vm.authentication.user){
          vm.order.deliveryName = vm.authentication.user.displayName
          vm.order.deliveryPhone = vm.authentication.user.phone
          vm.order.deliveryEmail = vm.authentication.user.email
          vm.order.deliveryAddress = vm.authentication.user.address
        }
        let storage = $window.localStorage.getItem('cart')
        if (storage) {
          vm.cart = JSON.parse(storage)
        }
        _.forEach(vm.cart, (item)=>{
          vm.summaryPrice +=item.totalPrice 
        })
        vm.cartTable.settings({ dataset: vm.cart })
        console.log(vm.cart);
      }
  
      vm.removeItem = (item) => {
        const confirm = $window.confirm(
          `Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng ?`
        )
        if (!confirm) {
          return
        }
        let storage = $window.localStorage.getItem('cart')
        if (storage) {
          vm.cart = JSON.parse(storage)
        }
        vm.cart = _.reject(vm.cart,(product)=>{
          return product._id.toString() === item._id.toString()
        })
        $state.reload()
        $window.localStorage.setItem('cart', JSON.stringify(vm.cart))
        
      }
      vm.calculate = (item)=>{
        let storage = $window.localStorage.getItem('cart')
        if (storage) {
          vm.cart = JSON.parse(storage)
        }
        console.log(item.buyQuantity);
        let product = _.find(vm.cart, { _id: item._id })
        product.buyQuantity = item.buyQuantity
        product.totalPrice = product.buyQuantity * product.price
        vm.summaryPrice = 0
        _.forEach(vm.cart, (item)=>{
          vm.summaryPrice +=item.totalPrice 
        })
        $window.localStorage.setItem('cart', JSON.stringify(vm.cart))
      }
      vm.ordered = () => {
        if(!vm.order.deliveryName|| !vm.order.deliveryPhone||!vm.order.deliveryEmail||!vm.order.deliveryAddress||!vm.order.deliveryPaymentMethod){
          return alert("Vui lòng nhập đủ thông tin mua hàng !")
        }
        var regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (regexPhone.test(vm.order.deliveryPhone) == false) 
            {
              return  alert('Số điện thoại của bạn không đúng định dạng!');
            }
        var regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (regexEmail.test(vm.order.deliveryEmail) == false) 
            {
              return  alert('email của bạn không đúng định dạng!');
            }
        const confirm = $window.confirm(
          `Bạn chắc chắn muốn đặt hàng ?`
        )
        if (!confirm) {
          return
        }
        let storage = $window.localStorage.getItem('cart')
        if (storage) {
          vm.cart = JSON.parse(storage)
        }
        $http
          .put('/orders/order-done', {
              shoppingCart: vm.cart ? vm.cart : [],
              clientOrder : vm.order,
          })
          .then(() => {
            $location.path('/order-done') 
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Đặt hàng thành công!' });
          })
          .catch((err) => {
            return console.log('lỗi');
          })
          .finally(() => {
            $window.localStorage.removeItem('cart');
          })   
          
      }
      vm.findProductById=(product)=>{
        let storage = $window.localStorage.getItem('product')
        if (storage) {
          $window.localStorage.removeItem('product');
        }
  
        $window.localStorage.setItem('product', JSON.stringify(product))
        console.log(product);
        $location.path('/view-product') 
      } 
  
      vm.viewProduct = () => {
        console.log('123');
        let storage = $window.localStorage.getItem('product')
        if (storage) {
          vm.productFindById = JSON.parse(storage)
        }
        console.log(vm.productFindById);
      }
  
      vm.createContact = ()=>{
        if(!vm.contact.fullName||!vm.contact.email||!vm.contact.phone||!vm.contact.detail){
          return alert("Vui lòng nhập đủ thông tin liên hệ !")
        }
        var regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (regexPhone.test(vm.contact.phone) == false) 
            {
              return  alert('Số điện thoại của bạn không đúng định dạng!');
            }
        var regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (regexEmail.test(vm.contact.email) == false) 
            {
              return  alert('email của bạn không đúng định dạng!');
            }
        $http
          .put('/contacts/create-contact', {
            contact : vm.contact,
          })
          .then(() => {
            $location.path('') 
            return  alert('Chúng tôi đã nhận được liên hệ của bạn, chúng tôi sẽ sớm liên hệ lại với bạn!');
          })
          .catch((err) => {
            return console.log('lỗi');
          })
          .finally(() => {
          })   
      }
      vm.getListPosts = ()=>{
        Posts.query((data) => {
          vm.posts = data
          _.forEach(vm.posts, (post) => {
            post.createdAt = moment(post.createdAt).format("L - LT");
            
          })
          console.log(vm.posts);
        });
      }
      vm.getPost=(post)=>{
        let storage = $window.localStorage.getItem('post')
        if (storage) {
          $window.localStorage.removeItem('post');
        }
        $window.localStorage.setItem('post', JSON.stringify(post))
        $location.path('/view-post') 
        $location.reload()
      } 
  
      vm.viewPost =()=>{
        let storage = $window.localStorage.getItem('post')
        if (storage) {
          vm.postFindById = JSON.parse(storage)
        }
      }

      vm.productsFindByCategory = []
      vm.viewProductByCategory=()=>{
        let storage1 = $window.localStorage.getItem('categoryName')
        if (storage1) {
          vm.categoryName = JSON.parse(storage1)
        }
        let storage2 = $window.localStorage.getItem('productsFindByCategory')
        if (storage2) {
          vm.productsFindByCategory = JSON.parse(storage2)
        }
      } 
      vm.addComment = () =>{
        if(!vm.authentication.user){
          return alert('Bạn phải đăng nhập để có thể bình luận!');
        }
        
        vm.comment.productId = vm.productFindById._id
        Orders.query((data) => {
          vm.check = false
          vm.orders = data
          vm.orders = _.filter(vm.orders, (order)=>{
            return order.status === 'done'
           })
          vm.orders = _.filter(vm.orders, (order)=>{
            return order.customerId && order.customerId.toString()===vm.authentication.user.id.toString()
           })
           vm.array = []
           _.forEach(vm.orders, (order)=>{
            vm.array = _.uniqBy(_.concat(vm.array,order.orderDetails),'productId._id')
           })
           _.forEach(vm.array, (item)=>{
            if (item.productId._id.toString()=== vm.comment.productId.toString()) {
              vm.check = true
            } 
           })
        console.log(vm.array);
        });
        console.log(vm.check);
        if (vm.check === false) {
          return alert('Bạn chưa mua sản phẩm nên không thể bình luận!');
        } else{
          $http
          .put('/comments/create-comment', {
            comment : vm.comment,
          })
          .then(() => { 
            $state.reload()
            return   alert('Bạn đã gửi bình luận thành công!');
            
          })
          .catch((err) => {
            return console.log('lỗi');
          })
        }
         
       
      }
      vm.loadComment = ()=>{
        vm.comments = Comments.query({
        })
        vm.comments.$promise.then(() => {
          vm.comments = _.filter(vm.comments, (comment)=>{
            return comment.productId.toString()===vm.productFindById._id.toString()
           })
          _.forEach(vm.comments, (comment) => {
            comment.createdAt = moment(comment.createdAt).format("LT L");
            
          })
        })
        
        
        console.log(vm.comments);
      }
      vm.filterByPrice = ()=>{
        if (!vm.startPrice) {
          vm.startPrice = 0
        }
        if (!vm.endPrice) {
          vm.endPrice = 0
        }
        if (vm.startPrice>vm.endPrice) {
          return alert('Giá sau không được nhỏ hơn giá trước!')
        }
        vm.products = _.filter(vm.products, (product)=>{
          return (product.price>=vm.startPrice&&product.price<=vm.endPrice)
         })
       
      }
      vm.filterByPrice2 = ()=>{
        if (!vm.startPrice) {
          vm.startPrice = 0
        }
        if (!vm.endPrice) {
          vm.endPrice = 0
        }
        if (vm.startPrice>vm.endPrice) {
          return alert('Giá sau không được nhỏ hơn giá trước!')
        }
        vm.productsFindByCategory = _.filter(vm.productsFindByCategory, (product)=>{
          return (product.price>=vm.startPrice&&product.price<=vm.endPrice)
         })
       
      }
      vm.findProducts1 = ()=>{
        Products.query((data) => {
          vm.productsFindByCate1 = _.filter(data,(product)=>{
            return product.categoryId.name === 'Laptop'
          })
        });
      }
      vm.findProducts2 = ()=>{
        Products.query((data) => {
          console.log(data);
          vm.productsFindByCate2 = _.filter(data,(product)=>{
            return product.categoryId.name === 'Linh kiện máy tính'
          })
        });
      }
    }
  
  }());
  