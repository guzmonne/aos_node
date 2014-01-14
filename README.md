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