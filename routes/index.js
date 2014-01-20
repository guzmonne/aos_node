var uid = require('uid2');

exports.index = function(req, res){
  res.render('index', { 
  	title: 'AOS', 
  	csrf : req.csrfToken()
  });
};

exports.session = function(req, res){
	// Check for authentication
	if (req.session.user){
		res.send(200, {
			auth: true,
			user: req.session.user
		});
	}	else {
		res.send(401, {
			auth: false,
			csrf: req.csrfToken()
		});
	}
};

exports.login = function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	for (var i = 0; i < Users.length; i++){
		var user = Users[i];
		console.log("User Email: " + user.email, "User Pass: " + user.password);
		if (user.email == email && user.password == password){
			req.session.user = user;
			return res.send(200, {
				auth: true,
				user: user
			});
		}
	};
	return res.send(401);
};

exports.logout = function (req, res){
	// Sending new csrf to client when user logged out 
	// for next user to sign in without refreshing the page
	req.session.user = null;
	req.session._csrf = uid(24);

	res.send(200, {
		csrf: req.csrfToken()
	});
};

// ==============
// DUMMY DATABASE
// ==============
var Users = [
	{
		firstName: 'Guzman',
		lastName : 'Monne',
		password : 'pass',
		email    : 'guzmonne@hotmail.com',
		id       : 1
  },
  {
		firstName: 'Emilia',
		lastName : 'Cerviño',
		password : 'pass',
		email    : 'maemilia4@hotmail.com',
		id       : 2	
  }
];