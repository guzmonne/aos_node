class App.Models.Session extends Backbone.Model 
	url : '/session'

	initialize: ->
		# Ajax request configuration to set the 
		# CSRF Tokem to request header
		$.ajaxSetup 
			headers:
				'X-CSRF-Token': csrf
		# Check for sessionStorage support
		if Storage and sessionStorage
			@supportStorage = true

	get: (key) ->
		if @supportStorage
			data = sessionStorage.getItem key
			if data and data[0] == '{'
				return JSON.parse data
			else
				return data
		else
			return Backbone.Model.prototype.get.call this, key

	set: (key, value) ->
		if @supportStorage
			sessionStorage.setItem key, value
		else
			Backbone.Model.prototype.set.call this, key, value
		return this

	unset: (key) ->
		if @supportStorage
			sessionStorage.removeItem key
		else
			Backbone.Model.prototype.unset.call(this, key)
		return this

	clear: ->
		if @supportStorage
			sessionStorage.clear()
		else
			Backbone.Model.prototype.clear this

	login: (credentials) ->
		login = $.ajax
			url : "#{@url}/login"
			data: credentials
			type: 'POST'
		login.done (response) =>
			@set "authenticated", true
			@set "user", JSON.stringify(response.user);
			if @get "redirectFrom"
				path = @get "redirectFrom"
				@unset "redirectFrom"
				Backbone.history.navigate path, {trigger: true}
			else
				Backbone.history.navigate "", {trigger: true}
		login.fail ->
			Backbone.history.navigate "login", {trigger: true}

	logout: (callback) ->
		logout = $.ajax
			url : "#{@url}/logout"
			type: 'DELETE'
		logout.done (response) =>
			# Clear the session data
			@clear()
			# Set the new csrf token to csrf variable and call initialize to
			# update the $.ajaxSetup with new csrf
			csrf = response.csrf
			@initialize()
			callback()

	getAuth: (callback) ->
		Session = @fetch()

		Session.done (response) =>
			@set "authenticated", true
			@set "user", JSON.stringify(response.user)

		Session.fail (response) =>
			response = JSON.parse response.responseText
			@clear()
			if response.csrf != csrf then csrf = response.csrf else csrf = csrf
			@initialize()

		Session.always callback
