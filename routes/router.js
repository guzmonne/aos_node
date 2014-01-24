// ===========
// CONTROLLERS
// ===========
var index = require('./index');
var user  = require('./user');

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
	app.get( '/api/users', 			user.index);
	app.get( '/api/users/:id',	Auth, user.show);
	app.post('/api/users', 			user.create);
	// --------------
	// SESSION ROUTES
	// --------------
	app.get( '/session', 				index.session);
	app.post('/session/login'
		, passport.authenticate('local')
		, index.login);
	app.del( '/session/logout', index.logout);

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
