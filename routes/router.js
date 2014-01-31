// ===========
// CONTROLLERS
// ===========
var index = require('./index');
var user  = require('./user');
var sse   = require('../libs/server-side_events');

// ======
// ROUTES
// ======
module.exports = function(app, passport){
	// ----
	// MAIN
	// ----
	app.get('/', index.index);
	// ----
	// USER
	// ----
	app.get( '/api/users', 			Auth, user.index);
	app.get( '/api/users/:id',	Auth, user.show);
	app.post('/api/users', 			Auth, user.create);
	// --------------
	// SESSION ROUTES
	// --------------
	app.get( '/session', 				index.session);
	app.post('/session/login'
		, function (req, res, next){
			passport.authenticate('local', function(err, user, info){
				if (err) {return next(err);}
				if (!user) {
					return res.send(400,{
						error: info.message
					})
				}
				req.session.user = user;
				next();
			})(req, res, next);
		}
		, index.login);
	app.del( '/session/logout', index.logout);
	// =======================
	// SERVER SIDE EVENT ROUTE
	// =======================
	app.get('/sse', sse.sseInit);
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
}
