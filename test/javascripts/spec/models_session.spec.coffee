describe "App.Models.Session", ->
	before ->
		@model = new App.Models.Session()

	describe "login(object: credentials)", ->
		it "should send a POST request with the given credentials"
		it "sholud set the user and authenticate it"
		it "should redirect the user back to where he came or to the index"
		it "should redirect to the login page if the call failed"

	describe "logout(function: callback)", ->
		it "should send a DELETE request"
		it "should clear the session data"
		it "should update the csrf value"
		it "should run a callback at the end"

	describe "getAuth(function: callback)", ->
		it "should fetch and set the session values"
		it "should clear the session values and update the session if the user is not authorized"
		it "should run a callback function at the end"
		