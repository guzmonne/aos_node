class App.Views.ContentView extends App.Views.BaseView 
	template: HBS['src/templates/content.hbs']

	awake: ->
		@listenTo App.vent, "sse:users:updated", (data) -> $('h1').text(data.data)