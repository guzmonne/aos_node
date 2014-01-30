// ===================
// MODULE DEPENDENCIES
// ===================
var express  = require('express');
var fs       = require('fs');
var http     = require('http');
var path     = require('path');
var toobusy  = require('toobusy');
var config   = require('./config.js');
var passport = require('passport');
var events   = require('events');
// Session management using Redis
var RedisStore = require('connect-redis')(express);

// ========
// DATABASE
// ========
var mongoose   = require('mongoose');
// Connect to mongodb
var dbConnect = function(){
	var mongooseOptions = { server: {socketOptions: {keepAlive: 1}}};
	mongoose.connect('mongodb://localhost/aos', mongooseOptions);
};
dbConnect();
// Connection object
var db = mongoose.connection;
// Error Handler
db.on('error', console.error.bind(console, 'connection error:'));
// Open Connection
db.on('open', function callback(){
	console.log("Connection successfull!");
});
// Diconnected
db.on('disconnected', function(){
	dbConnect();
});
// Load Models
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file){
	if (~file.indexOf('.js')) require(modelsPath + '/' + file);
});

// =======
// EXPRESS
// =======
// Initiate express app
var app = express();
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
app.use(passport.initialize());
app.use(passport.session());
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

// =======
// TOOBUSY
// =======
app.use(function(req, res, next){
	if (toobusy()){
		res.send(503, "I'm too busy right now, sorry for the inconvenience.");
	} else {
		next();
	}
});

// ========
// PASSPORT
// ========
require('./passport')(passport);

// ======
// ROUTES
// ======
require('./routes/router')(app, passport);

// =============
// DEFAULT ROUTE
// =============
app.use(function(req, res){
  res.render('404', { 
  	title: 'AOS', 
  });
});

// ===========================
// SERVER & SERVER-SIDE EVENTS
// ===========================
var server = http.createServer(app);
//require('./server-side_events')(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
