class App.Views.BaseView extends Backbone.View 
	template            : null
	dismissAlertTemplate: HBS['src/templates/snippets/dismiss_alert.hbs']

	initialize: ->
		if @awake then @awake()
		@innerViews = []

	render: ->
		if _.isFunction @beforeRender then @beforeRender()
		if @model then model = @model.attributes else model = {}
		$(@el).html(@template(model))
		if _.isFunction @afterRender then @afterRender()
		this

	renderIn: (container) ->
		if @model then model = @model.attributes else model = {}
		$(container).html(@template(model));
		this

	close: ->
		if _.isFunction @beforeClose then @beforeClose()
		if _.isFunction @onClose then @onClose()
		@remove()

	onClose: ->
		if @innerViews.length > 0
			for view in @innerViews
				view.close()

	dismissAlert: (target, options) ->
		return unless target?
		if options?
			attrs = options
		else
			attrs = {
				alert: "info",
				message: "<strong>HINT:</strong> You should pass an Object with a message."
			}
		target = @$(target)
		if options? and options.fade? and options.fade
			target.hide().html(@dismissAlertTemplate(attrs)).fadeIn('slow')
		else
			target.html(@dismissAlertTemplate(attrs))

	handleValidations: (model, errors) ->
		@$('p.control-label').remove()
		@$('.has-error').removeClass('has-error')
		for error, i in errors
			input   = @$("[name=#{error.attr}]")
			labels  = $(".error-label-for-#{error.attr}")
			message = '<p class="control-label error-label-for-' + error.attr + '"><span class="glyphicon glyphicon-remove"></span>' + "  " + error.message + '</p>'
			input.after message
			input.parent().addClass('has-error')