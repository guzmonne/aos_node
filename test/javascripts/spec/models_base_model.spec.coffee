describe "App.Models.BaseModel", ->

	beforeEach ->
		@model = new App.Models.BaseModel
		@model.validations = 
			"attr1":
				"presence": true
				"lengthGT": 3
			"attr2":
				"lengthLT": 12
			"attr3":
				"lengthGT": 3
				"lengthLT": 12
			"attr4":
				"presence": true
		@attr = 
			"attr1": "value1"
			"attr2": "value2"
			"attr3": "value3"
		@invAttr = 
			"attr1": ""
			"attr2": "MoreThanTwelveChars"
			"attr3": "3"

	describe "Validations", ->

		describe "validate(attr: Object, options: Object)", ->
			it "should parse the 'validations' object correctly and call the correct functions", ->
				sinon.spy @model, "validatePresenceOf"
				lengthSpy = sinon.spy @model, "validateLengthOf"
				@model.validate @attr
				expect(@model.validatePresenceOf).to.have.been.calledTwice
				expect(lengthSpy.callCount).to.equal(4)

			it "should return an array of error objects", ->
				result = @model.validate @invAttr
				expect(result).to.be.instanceof(Array)

			it "should return an array of objects with a 'attr' and 'message' key", ->
				result = @model.validate @invAttr
				for res in result
					keys = _.keys res
					expect(keys).to.contain "attr"
					expect(keys).to.contain "message"

			it "should not check atributes that are not yet in the model", ->
				errors = @model.validate(@invAttr)
				for error in errors
					expect(error.attr).not.to.equal("attr4")

		describe "validatePresenceOf(value: Var)", ->
			it "should return true if the value exists and it's not empty", ->
				value = "NotEmpty"
				result = @model.validatePresenceOf(value)
				expect(result).to.be.true

			it "should return false if the value does not exists or is empty", ->
				value = null
				result = @model.validatePresenceOf(value)
				expect(result).to.be.false
				value = ""
				result = @model.validatePresenceOf(value)
				expect(result).to.be.false

		describe "validateLengthOf(value: Var, length: Number, comp: String)", ->
			it "should return true if comp = 'gt' and value length is bigger than 'length'", ->
				value = "SomeValue"
				length = 3
				comp = 'gt'
				result = @model.validateLengthOf(value, length, comp)
				expect(result).to.be.true

			it "should return false if comp = 'gt' and value length is less than 'length'", ->
				value = "SomeValue"
				length = 12
				comp = 'gt'
				result = @model.validateLengthOf(value, length, comp)
				expect(result).to.be.false

			it "should return true if comp = 'lt' and value length is less than 'length'", ->
				value = "SomeValue"
				length = 12
				comp = 'lt'
				result = @model.validateLengthOf(value, length, comp)
				expect(result).to.be.true

			it "should return false if comp = 'lt' and value length is greater than 'length'", ->
				value = "SomeValue"
				length = 3
				comp = 'lt'
				result = @model.validateLengthOf(value, length, comp)
				expect(result).to.be.false