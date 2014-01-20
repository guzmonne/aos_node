class App.Views.AppNav extends App.Views.BaseView  
	template: HBS['src/templates/app_nav.hbs']

	events:
		'click ul.nav.navbar-nav li a': 'toggleActiveButton'
		'click #nav-logout'           : 'logout'

	render: ->
		$(@el).html(@template(@model.get("user")))
		this

	awake: ->
		#console.log @model.attributes

	toggleActiveButton: (e) ->
		id = '#' + e.target.id
		$('ul.nav.navbar-nav li.active').removeClass('active')
		$(id).parent().addClass('active')

	logout: (e) ->
		App.session.logout ->  Backbone.history.navigate '#login', { trigger : true }