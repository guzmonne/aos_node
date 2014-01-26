class App.Models.User extends App.Models.BaseModel
	urlRoot: '/api/users'

	validations: 
		username:
			"presence": true
			"lengthGT": 3
			"lengthLT":	50
		firstname:
			"presence": true
			"lengthLT":	50
		lastName: 
			"presence": true
			"lengthLT": 50
		email:
			"presence": true
			"email"   : true
		password:
			"presence": true
			"lengthGT": 7
			"lengthLT":	20