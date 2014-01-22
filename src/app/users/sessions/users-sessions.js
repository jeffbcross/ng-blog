angular.module('users-sessions', [])

.config(function($stateProvider){

	$stateProvider

	.state( 'users-login', {

    url: '/users/login',
    views: {
      "main": {
        controller: 'UsersLoginCtrl',
        templateUrl: 'users/sessions/users-login.tpl.html'
      }
    },
    data:{ pageTitle: 'Start'}
   
   
  })

	.state('users-logout',{
		url:'/users/logout',
		views:{
			"main":{
				controller: 'UsersLogoutCtrl'
			}
		},
		data:{pageTitle: ""}
	});

})

.controller('UsersLoginCtrl', function($scope, $http, $location, $rootScope){

	$scope.login=function(){
		$http.post('/users/login', {'username':$scope.username, 'password':$scope.password})
		.success(function(){
			$rootScope.isLoggedIn=true;
			$location.path("/posts/create-post");
		})
		.error(function(data, status, err, config){
			alert('You were not able to be logged in: '+ err + " "+ status);
		});
	};
})

.controller('UsersLogoutCtrl', function($scope, $http, $location, $rootScope){

	$http.post('/users/logout')
	.success(function(){
		$rootScope.isLoggedIn=false;
		$location.path('/users/login');

	})
	.error(function(){
		alert('Unable to log you out.');
	});

});