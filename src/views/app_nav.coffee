class App.Views.AppNav extends App.Views.BaseView  
	name: "AppNav"

	template: HBS['src/templates/app_nav.hbs']

	events:
		'click ul.nav.navbar-nav li a': 'toggleActiveButton'
		'click .navbar-brand'					: 'removeActive'

	awake: ->
		@listenTo App.user, "change", @render()

	removeActive: ->
		$('ul.nav.navbar-nav li.active').removeClass('active')

	toggleActiveButton: (e) ->
		id = '#' + e.target.id
		@removeActive()
		$(id).parent().addClass('active')