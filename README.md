AOS
===
----------

v0.0.1
------
Express running on Node.JS with 'Backbone.js' as its frontend framework and 'Twitter Bootstrap 3' as its style framework.

There are several 'Grunt' tasks created to facilitate the development of the app. Backbone.js related scripts are meant to be created inside the `/src` folder using 'CoffeScript'. Using the `grunt watch` task on the background, whenever a modification, creation, or deletion of a CoffeeScript file occurs in this folder, they will be compiled to JavaScript and concatenated into a file called `/public/javascripts/client.js`. This file is already in the `layout.jade` template which contains the main HTML blocks.

All the libraries can be found on the `/public/javascripts` and `/public/stylesheets` folders. The latest releases of every library up to the 10 of January 2014 are used.

There is no restful server API configured yet for persistent data.

Tests frameworks are not yet implemented.

This version can be found under the `git tag` 'v0.0.1'. It is meant to be use as a startup for more complex apps.

----------

v0.0.1a
-------
The only difference is that this version has Mocha.js working as the test framework. Also, Chai.js, and Sinon.js are used. 

The `app.js` file was modified to serve static files from the `/test` folder when working on the app on development mode. So, accesing `localhost:3000/test.html` will open the setup page with the results of the test plus a few annotations about the framework and testing a Backbone app.

Some tasks have been added to the `Gruntfile.js` to facilitate the creation of the tests. Running `grunt watchTasks` will start a task that monitors the `/src` folder for coffeescripts files to compile, and the `/test/javascripts/spec` to concatenate the specs into one file called `/test/javascripts/allspecs.js` so the test immediately appears on the `test.html` page.

This version can be found under the `git tag` 'v0.0.1a'. It is meant to be use as a startup for more complex apps that needs to work with a basic testing framework.

The next steps are to include 'Phantom.js' to create a browser simulation enviroment and to modify the existing code to work with 'Require.js'.

----------

v0.0.1b
-------
This version has PhantomJS incorporated to the 'package.json' for browserless tests. 

Also, new tasks has been added to the Gruntfile.js to allow the compilation of `*.spec.coffee` files and for continuous testing. Running `grunt concurrent:watch` now compiles all the coffee files in the `/src` and `/test/javascripts/specs` folders and automatically runs the tests as specified on the `test/test.html` file.

Spec files can be created individually using CoffeeScript or JavaScript on the spec folder and they will be automatically compiled and concatenated into one file, which is already bootstraped to the `test.html` file for testing.

This version can be found under the `git tag` 'v0.0.1b'. It is meant to be use as a startup for more complex apps that needs to work with a basic testing framework.

I was planning to use RequireJS for this application but after some thoughts I am not going to do it. Since the beggining my plan was to minify and uglify all the scrips before putting them into production, either with RequireJS or Grunt. The dependency management between scripts is not a major problem when using Backbone and concatenating the files automatically with Grunt. So, I'll just leave things as they are now. Maybe later I will fork this version and create a RequireJS version of it.

The next step is to hook the app to a database. I don't really know which type yet though. Probably gonna try a NoSQL database like MongoDB or Redis, just to get the hang of them. If I end up going for a traditional RDBMS, I'll probably use PostgreSQL since it has worked great for me in the past. Some more research on database management using node is needed to reach the final decision.


----------

v0.0.1c
-------
Chages:

 - Changes in the Grunt tasks:
  	- Now the task for compiling CoffeeScript and the tests
  	   are separated. This helps me check more easily that 
  	   everything is ok.
 - Mores tests where added or modified
 - Added Sessions stored on a Redis Server
 - Added MongoDB for data persistance
 - Login capabilities using Passport.js
 - Created view for creating users (#register)
 - Created config file for passwords, and other delicate info
  	which I don't want published on GitHub

Next Steps:

- Making the register form only available for Admin users
 - Build an authorization system for the app

