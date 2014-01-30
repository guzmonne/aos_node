class App.Views.UsersIndex extends App.Views.BaseView
	template: HBS['src/templates/users/users_index.hbs']
	container: 'tbody'

	untrackedUsers: 0

	awake: ->
		@collection.fetch()
		#@listenTo @collection, "reset", @handleSync
		@listenTo @collection, "add", @appendView
		@listenTo @collection, "remove", @removeView
		@listenTo App.vent, "users:new", @sseUsersNew

	sseUsersNew: (message) ->
		@untrackedUsers++
		@$('.info').empty();
		@dismissAlert ".info",
			message: "#{if @untrackedUsers == 1 then "Se ha creado un nuevo usuario" else "Se han creado #{@untrackedUsers} nuevos usuarios"}
				<button id='resync' type='button' class='btn btn-info'>Sincronizar</button>
				"
	handleSync: ->
		@untrackedUsers = 0
		@collection.forEach (model) =>
			@appendView(model)

	appendView: (model) ->
		view = new App.Views.UsersRow({model: model})
		@addInnerView(view)

	removeView: (model) ->
		console.log model