class App.Views.Login extends App.Views.BaseView
	template: HBS['src/templates/login.hbs']

	events:
		"submit form": "login"

	login: (e) ->
		e.preventDefault()
		credentials =
			email   : $('[name=email]').val()
			password: $('[name=password]').val()
		@model.login(credentials)

	beforeRender: ->
		$('body').addClass('snowbg')

	beforeClose: ->
		$('body').removeClass('snowbg')