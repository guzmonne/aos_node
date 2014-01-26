describe "App.Models.User", ->
	# beforeEach ->
	# 	@model = new App.Models.User
	# 	@model.validations = 
	# 		"attr1":
	# 			"presence": true
	# 			"lengthGT": 3
	# 		"attr2":
	# 			"lengthLT": 12
	# 		"attr3":
	# 			"lengthGT": 3
	# 			"lengthLT": 12
	# 	@attr = 
	# 		"attr1": "value1"
	# 		"attr2": "value2"
	# 		"attr3": "value3"
	# 	@invAttr = 
	# 		"attr1": ""
	# 		"attr2": "MoreThanTwelveChars"
	# 		"attr3": "3" 

	# describe "Validations", ->

	# 	describe "validate(attr: Object, options: Object)", ->
	# 		it "should parse the 'validations' object correctly and call the correct functions", ->
	# 			sinon.spy @model, "validatePresenceOf"
	# 			lengthSpy = sinon.spy @model, "validateLengthOf"
	# 			@model.validate @attr
	# 			expect(@model.validatePresenceOf).to.have.been.calledOnce
	# 			expect(lengthSpy.callCount).to.equal(4)

	# 		it "should return an array of error objects", ->
	# 			result = @model.validate @invAttr
	# 			expect(result).to.be.instanceof(Array)

	# 		it "should return an array of objects with a 'attr' and 'message' key", ->
	# 			result = @model.validate @invAttr
	# 			for res in result
	# 				keys = _.keys res
	# 				expect(keys).to.contain "attr"
	# 				expect(keys).to.contain "message"