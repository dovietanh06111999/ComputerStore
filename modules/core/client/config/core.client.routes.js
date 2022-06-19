(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('list-products', {
        url: '/list-products',
        templateUrl: '/modules/core/client/views/list-products.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('find-products-by-cate', {
        url: '/find-products-by-cate',
        templateUrl: '/modules/core/client/views/find-products-by-cate.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('shopping-cart', {
        url: '/shopping-cart',
        templateUrl: '/modules/core/client/views/shopping-cart.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('order-done', {
        url: '/order-done',
        templateUrl: '/modules/core/client/views/order-done.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('view-product', {
        url: '/view-product',
        templateUrl: '/modules/core/client/views/view-product.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('create-contact', {
        url: '/create-contact',
        templateUrl: '/modules/core/client/views/create-contact.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('list-posts', {
        url: '/list-posts',
        templateUrl: '/modules/core/client/views/list-posts.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('view-post', {
        url: '/view-post',
        templateUrl: '/modules/core/client/views/view-post.client.view.html',
        controller: 'ListProductsController',
        controllerAs: 'vm'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
}());
