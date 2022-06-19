(function () {
  'use strict';
  angular
    .module('contacts')
    .factory('Contacts', Contacts);
    Contacts.$inject = ['$resource'];
  function Contacts($resource) {
    var Contacts = $resource('/api/contacts/:contactId', {
      contactId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Contacts;

  }
}());
