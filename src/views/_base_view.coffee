class App.Views.BaseView extends App.Regions.BaseRegion 
	template            : null
	dismissAlertTemplate: HBS['src/templates/snippets/dismiss_alert.hbs']

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

	addInnerView: (newView) ->
		throw new Error('You must pass a new view to be rendered') unless newView? 
		throw new Error('You must set the "container" property before calling this function') unless @container?
		@innerViews.push newView
		@renderView(newView)

	close: ->
		if _.isFunction @beforeClose then @beforeClose()
		if _.isFunction @onClose then @onClose()
		@remove()

	onClose: ->
		if @innerViews.length > 0
			for view in @innerViews
				view.close()

	dismissAlert: (target, options) ->
		return new Error('Yoy must pass a target for the alert') unless target?
		if options?
			attrs = options
		else
			attrs = {
				alert: "info",
				message: "<strong>HINT:</strong> You should pass an Object with a message."
			}
		target = $(target)
		if options? and options.fade? and options.fade
			target.hide().html(@dismissAlertTemplate(attrs)).fadeIn('slow')
		else
			target.html(@dismissAlertTemplate(attrs))

	handleValidations: (model, errors) ->
		@dismissAlert '.info',
			alert  : "danger"
			message: 'Verifique su información'
		@$('p.control-label').remove()
		@$('.has-error').removeClass('has-error')
		return unless errors? and model?
		for error, i in errors
			input   = @$("[name=#{error.attr}]")
			labels  = $(".error-label-for-#{error.attr}")
			message = '<p class="control-label error-label-for-' + error.attr + '"><span class="glyphicon glyphicon-remove"></span>' + "  " + error.message + '</p>'
			input.after message
			input.parent().addClass('has-error')