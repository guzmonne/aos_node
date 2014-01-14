class App.Models.User extends Backbone.Model
	urlRoot: '/users'

	url: ->
		u = @urlRoot
		if @id then u = u + "/#{@id}"
		u

	defaults: ->
		id: Math.floor((Math.random()*100)+1)
		name: ""
		email: ""
		phone: ""
		cellphone: ""
		rememberToken: ""
		createdAt: new Date()
		updatedAt: new Date()