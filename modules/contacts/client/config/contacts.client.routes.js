(function () {
    'use strict';
  
    angular
      .module('contacts')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      $stateProvider
        .state('createContact', {
          url: '/contacts/create',
          templateUrl: '/modules/contacts/client/views/create-contact.client.view.html',
          data: {
            roles: ['admin']
          },
        })
        .state('listContacts', {
          url: '/contacts/list',
          templateUrl: '/modules/contacts/client/views/list-contacts.client.view.html',
          data: {
            roles: ['admin']
          },
        })
        .state('editContact', {
          url: '/contacts/:contactId',
          templateUrl: '/modules/contacts/client/views/edit-contact.client.view.html',
          data: {
            roles: ['admin']
          },
        });
    }
  
  }());
  