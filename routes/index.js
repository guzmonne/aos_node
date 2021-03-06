// ===================
// MODULE DEPENDENCIES
// ===================
var uid = require('uid2');

function userSession(req){
	return {
		auth     : true,
		username : req.session.user.username,
		firstName: req.session.user.firstname,
		lastName : req.session.user.lastname,
		email    : req.session.user.email,
		username : req.session.user.username,
		id       : req.session.user._id
	}
}

exports.index = function(req, res){
  res.render('index', { 
  	title: 'AOS', 
  	csrf : req.csrfToken()
  });
};

exports.session = function(req, res){
	// Check for authentication
	if (req.session.user){
		res.send(200, userSession(req));
	}	else {
		res.send(401, {
			auth: false,
			csrf: req.csrfToken()
		});
	}
};

exports.login = function(req, res, next) {
  return res.send(200, userSession(req));
};

exports.logout = function (req, res){
	// Sending new csrf to client when user logged out 
	// for next user to sign in without refreshing the page
	req.session.user  = null;
	req.session._csrf = uid(24);

	res.send(200, {
		csrf: req.csrfToken()
	});
};