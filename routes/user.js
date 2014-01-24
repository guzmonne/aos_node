// ===================
// MODULE DEPENDENCIES
// ===================
var mongoose = require('mongoose');
var User = mongoose.model('User');

// ==================
// CONTROLLER METHODS
// ==================
exports.index = function(req, res){
  res.json({
		name: "Guzman Monne",
		email: "guzmonne@hotmail.com",
		phone: "6962030",
		cellphone: "099750505",
		rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
	});
};

exports.show = function(req, res){
	var id = req.params.id;

	for(var i = 0; i < Users.length; i++){
		if (id == Users[i].id){
			return res.send(Users[i]);
		}
	};
	return res.send(400);
};

exports.create = function(req, res){
	var params = {
		username  : req.body.username,
		firstname : req.body.firstname,
		lastname  : req.body.lastName,
		email     : req.body.email,
		password  : req.body.password,
		createdBy : "root"
	};
	var user = new User(params);
	user.save(function(err){
		if (err){
			return res.send(400, {
				error: utils.errors(err.errors),
				user : user,
				title: 'Sign Up'
			});
		}
	});
	return res.send(200, user);
};
