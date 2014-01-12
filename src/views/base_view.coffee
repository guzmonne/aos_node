class App.Views.BaseView extends Backbone.View 
	template: null

	# Created to avoid Model errors
	initialize: ->
		@model = App.appDetails

	render: ->
		$(@el).html(@template(@model.attributes))
		this