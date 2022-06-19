(function () {
  'use strict';

  angular
    .module('slides')
    .controller('SlidesController', SlidesController);

    SlidesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Slides', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function SlidesController($scope, $state, $location, Authentication, Notification, Slides, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.init = () => {
      Slides.query((data) => {
        console.log(data);
        vm.slides = data
        _.forEach(vm.slides, (slide) => {
          slide.createdAt = moment(slide.createdAt).format("LT - L");
          
        })
        vm.slideTable = new NgTableParams({}, { dataset: vm.slides })
      });
    }

    vm.create = () => {
      const slide = new Slides(vm.slide)
      if(!slide.name||!slide.imgage||!slide.position){
        return Notification.error({ message: 'Bạn chưa điền đủ thông tin', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      return slide
        .$save()
        .then(() => {
          $location.path('/slides/create')
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tạo slide thành công!' });
          $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        })
        .finally(() => {

        })
    }

    vm.findOne = () => {
      console.log($state.params.slideId);
      Slides.get({
        slideId: $state.params.slideId
      }, (data) => {
        vm.slide = data
      })
    }

    vm.update = () => {
      console.log('vm.slide');
      vm.slide
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật slide thành công!' });
          $state.go('listSlides')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,slide) => {
      console.log(slide);
      ConfirmModal.show(
        {},
        {
          headerText: `Xóa Chủ Đề ?`,
          bodyText: `Bạn có chắc chắn muốn xóa slide?`,
        }
      ).then(() => {
        slide
          .$remove()
          .then(() => {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xóa slide thành công!' });
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
