class App.Views.Register extends App.Views.BaseView
	template: HBS['src/templates/register.hbs']

	events:
		"submit form": "register"

	awake: ->
		@listenTo @model, "sync", @handleSuccess
		@listenTo @model, "error", @handleError

	register: (e) ->
		e.preventDefault()
		attributes = 
			username : $('[name=username]').val()
			firstname: $('[name=firstname]').val()
			lastName : $('[name=lastname]').val()
			email    : $('[name=email]').val()
			password : $('[name=password]').val()
		@model.save attributes

	handleSuccess: (model, response, options) ->
		console.log "Success"

	handleError: (model, xhr, options)->
		console.log "Error"