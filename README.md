AOS
===

v0.0.1
------
Express running on Node.JS with 'Backbone.js' as its frontend framework and 'Twitter Bootstrap 3' as its style framework.

There are several 'Grunt' tasks created to facilitate the development of the app. Backbone.js related scripts are meant to be created inside the `/src` folder using 'CoffeScript'. Using the `grunt watch` task on the background, whenever a modification, creation, or deletion of a CoffeeScript file occurs in this folder, they will be compiled to JavaScript and concatenated into a file called `/public/javascripts/client.js`. This file is already in the `layout.jade` template which contains the main HTML blocks.

All the libraries can be found on the `/public/javascripts` and `/public/stylesheets` folders. The latest releases of every library up to the 10 of January 2014 are used.

There is no restful server API configured yet for persistent data.

Tests frameworks are not yet implemented.

This version can be found under the `git tag` 'v0.0.1'. It is meant to be use as a startup for more complex apps.

v0.0.1a
-------
The only difference is that this version has Mocha.js working as the test framework. Also, Chai.js, and Sinon.js are used. 

The `app.js` file was modified to serve static files from the `/test` folder when working on the app on development mode. So, accesing `localhost:3000/test.html` will open the setup page with the results of the test plus a few annotations about the framework and testing a Backbone app.

Some tasks have been added to the `Gruntfile.js` to facilitate the creation of the tests. Running `grunt watchTasks` will start a task that monitors the `/src` folder for coffeescripts files to compile, and the `/test/javascripts/spec` to concatenate the specs into one file called `/test/javascripts/allspecs.js` so the test immediately appears on the `test.html` page.

This version can be found under the `git tag` 'v0.0.1a'. It is meant to be use as a startup for more complex apps that needs to work with a basic testing framework.

The next steps are to include 'Phantom.js' to create a browser simulation enviroment and to modify the existing code to work with 'Require.js'.