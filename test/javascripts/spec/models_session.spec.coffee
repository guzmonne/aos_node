describe "App.Models.Session", ->
	before ->
		@server = sinon.fakeServer.create();
		@data =
			"auth"     : true
			"username" : "gmonne"
			"firstName": "Guzman"
			"lastName" : "Monne"
			"email"    : "test@example.com"
			"id"       : "52e1122203d23ecf4943d8ce"
		@server.respondWith("GET", "/session", [
			200
			{"Content-Type":"application/json"}
			JSON.stringify(@data)
		])

		@server.respondWith("POST", "/session/login", [
			200
			{"Content-Type":"application/json"}
			JSON.stringify(@data)
		])

	after ->
		@server.restore()

	describe "login(object: credentials)", ->
		it "should make an AJAX request"
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
		