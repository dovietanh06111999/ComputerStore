(function () {
  'use strict'

  angular.module('core').factory('ConfirmModal', [
    '$uibModal',
    function ($uibModal) {
      var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/modules/core/client/templates/confirm-modal.client.template.html',
      }

      var modalOptions = {
        closeButtonText: 'Không',
        actionButtonText: 'OK',
        headerText: 'Tiếp tục?',
        bodyText: 'Bạn có chắc là bạn muốn làm chuyện này?',
      }

      function show(customModalDefaults, customModalOptions) {
        // Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {}
        var tempModalOptions = {}

        // Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults)

        // Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions)

        if (!tempModalDefaults.controller) {
          tempModalDefaults.controller = function ($scope, $uibModalInstance) {
            $scope.modalOptions = tempModalOptions
            $scope.modalOptions.ok = function (result) {
              $uibModalInstance.close(result)
            }
            $scope.modalOptions.close = function (result) {
              $uibModalInstance.dismiss('cancel')
            }
          }
        }

        return $uibModal.open(tempModalDefaults).result
      }

      return {
        showModal: function (customModalDefaults, customModalOptions) {
          if (!customModalDefaults) customModalDefaults = {}
          customModalDefaults.backdrop = 'static'
          return show(customModalDefaults, customModalOptions)
        },
        show,
      }
    },
  ])
}());
