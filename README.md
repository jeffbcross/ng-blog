ng-blog
=======

Angular-Deployd Blog App

Steps to Install ng-blog and get it working
-------------------------------------------

**Note: If you already have nodejs, and grunt-cli installed skip over steps 1 & 2**

1. Install nodejs - [http://nodejs.org](http://nodejs.org)
1. From command line install grunt-cli: npm install -g grunt-cli
1. From command line install deployd: npm install -g deployd
1. From command line run: npm install
1. From command line run: bower install
1. From command line run: grunt build
1. While inisde the ng-blog directory, run deployd from the command line: 
    - Type: cd dist && dpd
	- A message should appear indicating it is running on http://localhost:2403
1. In browser visit http://localhost:2403/dashboard and add data to Users and Posts collections
	- It is point and click here.  
		- Under "Resources" select a collection by clicking on it, either Users or Posts, 
		- Click on Data and add data to each collection
1. Once you've completed these steps, in browser visit: http://localhost:2403
1. You should see your posts
1. Click on "Login" - enter your username and password you entered in the Users collection
1. Fin.




Todo
====

**V1**

1. Add in db validation - only authenticated users should be able to create, edit, delete
1. Add in pw recovery via dpd-email - waiting to hear back on accessing Dashboard
1. Add user create, edit, delete pages - only for admins
1. Create user roles - admin, manager, user
1. Add tags to blog posts
1. File uploads for images

**V2**

1. Search capability? maybe v2
1. SEO friendly urls


