angular.module('app.posts-view', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-view', {
    
    resolve:{
        post:function(getSinglePost, $stateParams){
          return getSinglePost.init($stateParams.postSlug);
        }
      },

    url: '/post/:postSlug',
    views: {
      "main": {
        controller: 'PostsViewCtrl',
        templateUrl: 'posts/view/posts-view.tpl.html'
      }
    },
    data:{ pageTitle: 'Start'}
   
   
  });
})

.controller('PostsViewCtrl',function($scope, $http, $stateParams, getSinglePost, post){
    console.log($stateParams);
    console.log(getSinglePost.init($stateParams.postSlug));

    $scope.post=post.data[0];
  
  
});
