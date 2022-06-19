(function () {
  'use strict';

  angular
    .module('topics')
    .controller('TopicsController', TopicsController);

    TopicsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Topics', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function TopicsController($scope, $state, $location, Authentication, Notification, Topics, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;

    vm.init = () => {
      Topics.query((data) => {
        console.log(data);
        vm.topics = data
        _.forEach(vm.topics, (topic) => {
          topic.createdAt = moment(topic.createdAt).format("LT - L");
          
        })
        vm.topicTable = new NgTableParams({}, { dataset: vm.topics })
      });
    }

    vm.create = () => {
      const topics = new Topics(vm.topics)
      if(!topics.name){
        return Notification.error({ message: 'Bạn chưa điền đủ thông tin', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      return topics
        .$save()
        .then(() => {
          $location.path('/topics/create')
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
      console.log($state.params.topicId);
      Topics.get({
        topicId: $state.params.topicId
      }, (data) => {
        vm.topics = data
      })
    }

    vm.update = () => {
      console.log('123');
      vm.topics
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật chủ đề thành công!' });
          $state.go('listTopics')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,topic) => {
      console.log(topic);
      ConfirmModal.show(
        {},
        {
          headerText: `Xóa Chủ Đề ?`,
          bodyText: `Bạn có chắc chắn muốn xóa chủ đề: ${topic.name}?`,
        }
      ).then(() => {
        topic
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
