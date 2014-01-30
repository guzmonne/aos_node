// ===================
// MODULE DEPENDENCIES
// ===================
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Vent = require('../vent');

// ==================
// CONTROLLER METHODS
// ==================
exports.index = function(req, res){
	var query = User.find({});
	query.select('username firstname lastname email createdBy lastUpdated created');
	query.exec(function(err, result){
		if (err) return handleError(err, req, res);
		
		Vent.subscribe(req.session.user._id, 'users:new');

		return res.send(result);
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
	if (Object.keys(req.body).length === 0){
		return res.send(401, {
			error: {
				message: "Empty body sent"
			}
		});
	}
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
				error: err.errors
			});
		}

		Vent.propagateEvent({
			srvEvent: "users:new",
			data: {
				event: "users:new",
				data : "A new user was created"
			}
		});

		return res.send(200, {
			username : user.username,
			firstname: user.firstname,
			lastname : user.lastname,
			email    : user.email,
			id       : user._id,
		});
	});
};
