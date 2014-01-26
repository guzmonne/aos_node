class App.Views.ClientNav extends App.Views.BaseView  
	name: 'ClientNav'

	template: HBS['src/templates/header.hbs']

	events:
		'click ul.nav.navbar-nav li a': 'toggleActiveButton'

	toggleActiveButton: (e) ->
		id = '#' + e.target.id
		$('ul.nav.navbar-nav li.active').removeClass('active')
		$(id).parent().addClass('active')
