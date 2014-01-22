


// Declare app level module which depends on filters, and services
angular.module('app', [
	'ui.router',
	'app.directives',
	'app.filters',
	'app.services',
	'app.posts',
	'app.users',
	'templates.app'
	])
.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise("/posts");
})

.controller('AppCtrl', function($scope,$http, $rootScope){
	$http.get('/users/me')
            .success(function(result){
              if(typeof(result.username) ==="string"){
                $rootScope.isLoggedIn=true;
              }else{
                $rootScope.isLoggedIn=false;
              }
           });
	
})
;
  