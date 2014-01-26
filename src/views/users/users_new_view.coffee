class App.Views.UsersNew extends App.Views.BaseView
	template: HBS['src/templates/users/users_new.hbs']

	events:
		"submit form"   : "create"
		"focus input"   : "toggleLabel"
		"focusout input": "toggleLabel"	

	awake: ->
		@listenTo @model, "sync", @handleSuccess
		@listenTo @model, "error", @handleError
		@listenTo @model, "invalid", @handleValidations
		@modelBinder = new Backbone.ModelBinder()

	afterRender: ->
		@$('.control-label').hide()
		@modelBinder.bind @model, @$el

	beforeClose: ->
		@modelBinder.unbind()

	create: (e) ->
		e.preventDefault()
		@model.save()

	toggleLabel: (e) ->
		if _.isObject e 
			targetName = e.target.name
		else if _.isString e
			targetName = e
		if @$("input[name=#{targetName}]").val() == ""
			@$("[for=#{targetName}]").fadeToggle('fast')

	handleSuccess: (model, response, options) ->
		@model = new App.Models.User
		@render()
		@dismissAlert '.info', 
			fade   : true
			alert  : 'success'
			message: 'El usuario ha sido creado con exito.'
		$('[name=username]').focus()

	handleError: (model, xhr, options)->
		@dismissAlert '.info', 
			alert  : 'danger'
			message: 'Se ha producido un error al intentar crear el usuario.'