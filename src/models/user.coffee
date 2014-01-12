class App.Models.User extends Backbone.Model
	urlRoot: '/users'

	url: ->
		u = @urlRoot
		if @id then u = u + "/#{@id}"
		u

	defaults: ->
		id: null
		name: null
		email: null
		phone: null
		cellphone: null
		remember_token: null