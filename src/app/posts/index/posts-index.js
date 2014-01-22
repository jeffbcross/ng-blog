angular.module('app.posts-index', []).

config(function($stateProvider) {
  $stateProvider.state( 'posts-index', {
    
    resolve:{
      posts:  function(getPosts){
            // $http returns a promise for the url data
            //return $http({method: 'GET', url: '/posts'});
            return getPosts.init();
         }
      },

    url: '/posts',
    views: {
      "main": {
        controller: 'PostsIndexCtrl',
        templateUrl: 'posts/index/posts-index.tpl.html'
      }
    },
    data:{ pageTitle: 'Start'}
   
   
  });
})

.controller('PostsIndexCtrl',function($scope, $http, posts){
    $scope.posts=posts.data;
  
  
});
