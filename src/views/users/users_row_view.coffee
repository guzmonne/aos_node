class App.Views.UsersRow extends App.Views.BaseView
	template: HBS['src/templates/users/users_row.hbs']
	tagName: 'tr'

	awake: ->
		@listenTo @model, "remove", @close