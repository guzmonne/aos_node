class App.Models.BaseModel extends Backbone.Model

	url: ->
		u = @urlRoot
		if @id then u = u + "/#{@id}"
		u