angular.module('app.posts-delete', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-delete', {
    
   
    url: '/delete-post/:postId',
    views: {
      "main": {
        controller: 'PostsDeleteCtrl'
      }
    },
    data:{ pageTitle: 'Start'}
   
   
  });
})

.controller('PostsDeleteCtrl',function($scope, $http, $location, $stateParams){
  $http.delete('/posts/'+$stateParams.postId);
  $location.path('/posts');
  
    
  
  
});
