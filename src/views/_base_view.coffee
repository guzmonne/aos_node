class App.Views.BaseView extends Backbone.View 
	template: null

	# Created to avoid Model errors
	initialize: ->
		if @awake then @awake()
		@innerViews = []
		unless @model? then @model = App.appDetails

	render: ->
		$(@el).html(@template(@model.toJSON()))
		this

	renderIn: (container) ->
		$(container).html(@template(@model.attributes));
		this

	close: ->
		if @onClose then @onClose()
		@remove()

	onClose: ->
		if @innerViews.length > 0
			for view in @innerViews
				view.close()

