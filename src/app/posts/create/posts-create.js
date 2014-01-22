angular.module('app.posts-create', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-create', {
    

    url: '/create-post',
    views: {
      "main": {
        controller: 'PostsCreateCtrl',
        templateUrl: 'posts/create/posts-create.tpl.html'
      }
    },
    data:{ pageTitle: 'Start'}
   
   
  });
})

.controller('PostsCreateCtrl',function($scope, $http, $location){
    
    $scope.createPost=function(){
      $http.post('/posts',{'title':$scope.title, 'body':$scope.body, 'slug':$scope.slug});
      $location.path('/posts');
    };
  
  
});
