(function () {
    'use strict';
  
    angular
      .module('posts')
      .controller('PostsController', PostsController);
  
      PostsController.$inject = ['$scope', '$state', '$location','Topics', 'Authentication', 'Notification', 'Posts', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];
  
    function PostsController($scope, $state, $location,Topics, Authentication, Notification, Posts, $http, NgTableParams, $filter, ConfirmModal) {
      const vm = this;
      vm.authentication = Authentication;
  
      vm.init = () => {
        Posts.query((data) => {
          console.log(data);
          vm.posts = data
          _.forEach(vm.posts, (post) => {
            post.createdAt = moment(post.createdAt).format("LT - L");
            
          })
          vm.postTable = new NgTableParams({}, { dataset: vm.posts })
        });
      }
      vm.getTopics = () => {
        Topics.query((data) => {
          console.log(data);
          vm.topics = data
        });
      }
      vm.create = () => {
        console.log(vm.post);
       
        const post = new Posts(vm.post)
        if(!post.title||!post.image||!post.detail||!post.topicId){
          return Notification.error({ message: 'Bạn chưa điền đủ thông tin', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        }
        return post
          .$save()
          .then(() => {
            $location.path('/posts/create')
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tạo liên hệ thành công!' });
            $state.reload()
          })
          .catch((err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          })
          .finally(() => {
  
          })
      }
  
      vm.findOne = () => {
        console.log($state.params.postId);
        Posts.get({
          postId: $state.params.postId
        }, (data) => {
          vm.post = data
        })
      }
  
      vm.update = () => {
        console.log('vm.post');
        vm.post
          .$update()
          .then(() => {
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cập nhật liên hệ thành công!' });
            $state.go('listPosts')
          })
          .catch(
            (err) => {
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
            }
          )
      }
  
      vm.remove = (index,post) => {
        console.log(post);
        ConfirmModal.show(
          {},
          {
            headerText: `Xóa Chủ Đề ?`,
            bodyText: `Bạn có chắc chắn muốn xóa chủ đề: ${post.name}?`,
          }
        ).then(() => {
          post
            .$remove()
            .then(() => {
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Xóa liên hệ thành công!' });
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
  