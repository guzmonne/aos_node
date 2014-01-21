class App.Views.BaseView extends Backbone.View 
	template: null

	# Created to avoid Model errors
	initialize: ->
		if @awake then @awake()
		@innerViews = []

	render: ->
		if _.isFunction @beforeRender then @beforeRender()
		if @model then model = @model.attributes else model = {}
		$(@el).html(@template(model))
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

