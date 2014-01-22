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