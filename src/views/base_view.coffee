class App.Views.BaseView extends Backbone.View 
	template: null

	# Created to avoid Model errors
	initialize: ->
		unless @model? then @model = App.appDetails

	render: ->
		$(@el).html(@template(@model.attributes))
		this

	renderIn: (container) ->
		$(container).html(@template(@model.attributes));
		this