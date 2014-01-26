class App.Models.BaseModel extends Backbone.Model
	url: ->
		u = @urlRoot
		if @id then u = u + "/#{@id}"
		u

	validatePresenceOf: (value) ->
		return false if value == null
		if (value && value.length) then return true else return false

	validateLengthOf: (value, length, comp) ->
		return false if value == null
		switch comp 
			when "gt"
				if (value.length > length) then return true else return false
			when "lt"
				if (value.length < length) then return true else return false

	validate: (attrs, options) ->
		return unless attrs?
		errors = []
		for attr, validation of @validations
			for key, value of validation
				if attrs[attr]? then attribute = attrs[attr] else attribute = ""
				switch key
					when "presence"
						unless @validatePresenceOf(attribute) 
							errors.push {attr: attr, message: "este campo no puede permanecer vacío"}
					when "lengthGT"
						unless @validateLengthOf(attribute, value, 'gt')
							errors.push {attr: attr, message: "debe ingresar mas de #{value} caracteres"}
					when "lengthLT"
						unless @validateLengthOf(attribute, value, 'lt')
							errors.push {attr: attr, message: "debe ingresar menos de #{value} caracteres"}
		if errors.length > 0 then return errors 