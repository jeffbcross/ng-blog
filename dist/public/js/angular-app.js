


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

angular.module('app.posts', ['app.posts-index', 'app.posts-create', 'app.posts-edit', 'app.posts-delete', 'app.posts-view']);
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
angular.module('app.users', ['users-sessions']);
angular.module('app.directives', []);
angular.module('app.filters',[]);
angular.module('app.services',[])

.service('getPosts',function($http, $q, $timeout){

	this.init=function(){return $http.get('/posts');};
	
})

.service('getSinglePost', function($http){
	this.init = function(slug){
		var json = {'slug': slug};
		//var url ='/posts?'+json; 
		var url ='/posts?slug='+slug;
		return $http.get(url);
	};
});
angular.module('templates.app', ['footer.tpl.html', 'header.tpl.html', 'posts/create/posts-create.tpl.html', 'posts/edit/posts-edit.tpl.html', 'posts/index/posts-index.tpl.html', 'posts/view/posts-view.tpl.html', 'users/sessions/users-login.tpl.html']);

angular.module("footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer.tpl.html",
    "Copyright 2014");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "\n" +
    "    <div class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "          </button>\n" +
    "          <a class=\"navbar-brand\" href=\"#\">ng-Blog</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "          <ul class=\"nav navbar-nav\" ng-switch=\"isLoggedIn\">\n" +
    "           \n" +
    "           \n" +
    "            <li><a href=\"/#/posts\">Home</a></li>\n" +
    "            \n" +
    "            <li ng-switch-when=\"false\"><a href=\"/#/users/login\">Login</a></li>\n" +
    "            <li ng-switch-when=\"true\"><a href=\"/#/users/logout\">Logout</a></li>\n" +
    "\n" +
    "            <li ng-switch-when=\"true\"><a href=\"/#/create-post\">Add Post</a></li>\n" +
    "\n" +
    "\n" +
    "\n" +
    "          </ul>\n" +
    "        </div><!--/.nav-collapse -->\n" +
    "      </div>\n" +
    "    </div>");
}]);

angular.module("posts/create/posts-create.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("posts/create/posts-create.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-6\">\n" +
    "		<form action=\"\">\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"title\">Title</label>\n" +
    "				<input name=\"title\" class=\"form-control\" ng-model=\"title\" />	\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"slug\">Slug</label>\n" +
    "				<input name=\"slug\" class=\"form-control\" ng-model=\"slug\" />	\n" +
    "			</div>\n" +
    "			\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"body\">Body</label>\n" +
    "				<textarea class=\"form-control\" name=\"body\" ng-model=\"body\"></textarea>	\n" +
    "			</div>\n" +
    "	\n" +
    "			<button class=\"btn btn-normal\" ng-click=\"postUpdate()\">Update Post</button>\n" +
    "	</form>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("posts/edit/posts-edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("posts/edit/posts-edit.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-6\">\n" +
    "		<form action=\"\">\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"title\">Title</label>\n" +
    "				<input name=\"title\" class=\"form-control\" ng-model=\"post.title\" />	\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"slug\">Slug</label>\n" +
    "				<input name=\"slug\" class=\"form-control\" ng-model=\"post.slug\" />	\n" +
    "			</div>\n" +
    "			\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"body\">Body</label>\n" +
    "				<textarea class=\"form-control\" name=\"body\" ng-model=\"post.body\"></textarea>	\n" +
    "			</div>\n" +
    "			\n" +
    "			<button class=\"btn btn-normal\" ng-click=\"postUpdate()\">Update Post</button>\n" +
    "	</form>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("posts/index/posts-index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("posts/index/posts-index.tpl.html",
    "<div class=\"row\">\n" +
    "	\n" +
    "	<div class=\"col-md-8 col-md-offset-2\">\n" +
    "		\n" +
    "		<ul class=\"list-unstyled\">\n" +
    "			<li class=\"well\"ng-repeat=\"post in posts\">\n" +
    "				<h1><a href=\"/#/post/{{post.slug}}\">{{post.title}}</a></h1>\n" +
    "\n" +
    "				<div class=\"teaser\">{{post.body}}</div>\n" +
    "				<ul class=\"list-inline list-unstyled\">\n" +
    "					<li ng-if=\"isLoggedIn\"><a class=\"btn btn-info\" href=\"/#/edit-post/{{post.slug}}\">Edit Post</a></li>\n" +
    "					<li ng-if=\"isLoggedIn\"><a class=\"btn btn-danger\" href=\"/#/delete-post/{{post.id}}\">Delete Post</a></li>\n" +
    "				</ul>\n" +
    "			</li>\n" +
    "			\n" +
    "			\n" +
    "\n" +
    "\n" +
    "		</ul>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("posts/view/posts-view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("posts/view/posts-view.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-6\">\n" +
    "		<h1>{{post.title}}</h1>\n" +
    "		<div>{{post.body}}</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("users/sessions/users-login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("users/sessions/users-login.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-4 col-md-offset-2\">\n" +
    "		\n" +
    "		<form action=\"\">\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"username\">Username</label>\n" +
    "				<input class=\"form-control\" type=\"text\" name=\"username\" ng-model=\"username\">\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"password\">Password</label>\n" +
    "				<input class=\"form-control\" type=\"password\" name=\"password\" ng-model=\"password\">\n" +
    "			</div>\n" +
    "			<div class=\"form-group\">\n" +
    "				<button class=\"btn btn-normal\" ng-model=\"submit\" ng-click=\"login()\">Login</button>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
}]);
