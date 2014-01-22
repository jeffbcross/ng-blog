angular.module('app.posts-edit', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-edit', {
    
    resolve:{

      post:function(getSinglePost, $stateParams){
        return getSinglePost.init($stateParams.postSlug);
      }

    },
   

    url: '/edit-post/:postSlug',
    views: {
      "main": {
        controller: 'PostsEditCtrl',
        templateUrl: 'posts/edit/posts-edit.tpl.html'
      }
    },
    data:{ pageTitle: 'Start'}
   
   
  });
})

.controller('PostsEditCtrl',function($scope, $http, $location, post){
  $scope.post= post.data[0];

  $scope.postUpdate=function(){
    $http.put('/posts/'+$scope.post.id, {'title':$scope.post.title, 'body':$scope.post.body, 'slug':$scope.post.slug});
    $location.path('/posts');
  };
  
    
  
  
});
