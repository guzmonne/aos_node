// ===================
// MODULE DEPENDENCIES
// ===================
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var toobusy = require('toobusy');
var config = require('./config.js');
// Session management using Redis
var RedisStore = require('connect-redis')(express);

var app = express();

// ===============
// ALL ENVIROMENTS
// ===============
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	store: new RedisStore({
		host: config.session.redis.host,
		port: config.session.redis.port,
		db  : config.session.redis.db,
		pass: config.session.redis.pass
	}),
	secret: config.session.secret 
}));
app.use(express.csrf());
app.use(app.router);
app.use(function(req, res, next){
	res.setHeader('X-CSRF-Token', req.csrfToken());
	next();
});
app.use(express.static(path.join(__dirname, 'public')));

// ================
// DEVELOPMENT ONLY
// ================
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.static(path.join(__dirname, '/test')));
}

// middleware wich blocks requests when we're too busy
app.use(function(req, res, next){
	if (toobusy()){
		res.send(503, "I'm too busy right now, sorry for the inconvenience.");
	} else {
		next();
	}
});

// ==========
// MAIN ROUTE
// ==========
app.get('/', routes.index);

// ==========
// API ROUTES
// ==========
app.get('/api/users', user.all);
app.get('/api/users/:id', Auth, user.get); // Using the Auth filter for this route

// ==============
// SESSION ROUTES
// ==============
app.get('/session', routes.session);
app.post('/session/login', routes.login);
app.del('/session/logout', routes.logout);

// =============
// DEFAULT ROUTE
// =============
app.use(function(req, res){
  res.render('404', { 
  	title: 'AOS', 
  });
});

// =============
// ROUTE FILTERS
// =============
// Authentication Filter
// ---------------------
function Auth (req, res, next){
	if (req.session.user){
		next();
	} else {
		res.send(401, {
			flash: "Please log in first."
		});
	}
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
