AOS
===

[![Greenkeeper badge](https://badges.greenkeeper.io/guzmonne/aos_node.svg)](https://greenkeeper.io/)

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

----------

v0.0.1d
-------
Chages:

 - Changes in the Grunt tasks:
  	- The concurrent task was modified. Now server test specs can be created on CoffeeScript on the `/test/server/coffee_specs/` folder. So, a CoffeeScript 'compile' task was added, as well as a 'watch' task, and they where added to the 'concurrent' task.
 - Mores tests where added or modified
 - Server code can now be tested
  	- The specs can be created in CoffeeScript on the `/test/server/coffee_specs/` or we can write them in JavaScript on the `/test/server/specs/` folder. Mocha will only test the files on the `specs/` folder so remember to compile the CoffeeScripts tests.
 - Added Server Side Events
		- This means that we can now push information from the server to the clients.
		- A new object was created called 'Vent' that helps to keep track of the connected clients and can be used to push events to the clients so information can be sent to them.
		- SSE is started by the client when the user get successfuly authenticated
		- If the user get's disconnected it will be automatically be removed from the client list.
		- The 'App' object in the client is the one in charge of connecting to the SSE.
		- If the Browser is incapable of using the SSE there is not a fallback implemented. So, nothing will happen.
		- A very simple subsription model was implemented to send information only to subsribed clients
			- It can be seen in action with the users.
			- When a client asks for the users index information it automatically subscribes to 'users:new' events. When a new user is created, we let the clients know using  the Vent object. Only the subsribed clients will get this notification.
			- On the client side, if the 'UsersIndex' view is active it will react to the 'users:new' event sent by the server and display an info alert to the user.
			- The "Sincronizar" button is not working yet. Is just there for design.

Next Steps:

- Making the register form only available for Admin users
- Build an authorization system for the app
- Separating the login page from the rest of the app
- Implementing HTTPS

