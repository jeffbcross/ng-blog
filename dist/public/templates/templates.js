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
