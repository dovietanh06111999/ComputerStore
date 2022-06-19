(function () {
  'use strict';

  angular
    .module('comments')
    .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Comments', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function CommentsController($scope, $state, $location, Authentication, Notification, Comments, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;

    vm.init = () => {
      Comments.query((data) => {
        console.log(data);
        vm.comments = data
        _.forEach(vm.comments, (comment) => {
          comment.createdAt = moment(comment.createdAt).format("LT L");
          
        })
        vm.commentTable = new NgTableParams({}, { dataset: vm.comments })
      });
    }

    vm.create = () => {
      
      const comment = new Comments(vm.comment)
      if(comment.name === null){
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bạn chưa nhập tên danh mục sản phẩm!' });
      }
      console.log(comment);
      return comment
        .$save()
        .then(() => {
          $location.path('/comments/create')
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
      console.log($state.params.commentId);
      Comments.get({
        commentId: $state.params.commentId
      }, (data) => {
        vm.comment = data
      })
    }

    vm.update = () => {
      console.log('vm.comment');
      vm.comment
        .$update()
        .then(() => {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật chủ đề thành công!' });
          $state.go('listComments')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,comment) => {
      ConfirmModal.show(
        {},
        {
          headerText: `Xóa Chủ Đề ?`,
          bodyText: `Bạn có chắc chắn muốn xóa bình luận này ?`,
        }
      ).then(() => {
        comment
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
