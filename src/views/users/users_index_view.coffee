class App.Views.UsersIndex extends App.Views.BaseView
	template: HBS['src/templates/users/users_index.hbs']
	container: 'tbody'

	awake: ->
		@collection.fetch()
		#@listenTo @collection, "reset", @handleSync
		@listenTo @collection, "add", @appendView
		@listenTo @collection, "remove", @removeView

	handleSync: ->
		@collection.forEach (model) =>
			@appendView(model)

	appendView: (model) ->
		view = new App.Views.UsersRow({model: model})
		@addInnerView(view)

	removeView: (model) ->
		console.log model