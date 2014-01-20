exports.all = function(req, res){
  res.json({
		name: "Guzman Monne",
		email: "guzmonne@hotmail.com",
		phone: "6962030",
		cellphone: "099750505",
		rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
	});
};

exports.get = function(req, res){
	var id = req.params.id;

	for(var i = 0; i < Users.length; i++){
		if (id == Users[i].id){
			return res.send(Users[i]);
		}
	};
	return res.send(400);
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