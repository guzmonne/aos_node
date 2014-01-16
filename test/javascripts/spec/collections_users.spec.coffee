describe "App.Collections.Users", ->
	beforeEach ->
		@server = sinon.fakeServer.create()
		@server.autoRespond = true
		@users = new App.Collections.Users()

	afterEach ->
		@server.restore()

	describe "retrieval", ->
		it "has a single user", (done) ->
			users = @users

			# Returns a single model on GET
			@server.respondWith("GET", "/api/users", [
													200,
													{"Content-Type": "application/json"},
													JSON.stringify([{
															name: "Guzman Monne",
															email: "guzmonne@hotmail.com",
															phone: "6967896",
															cellphone: "789456312",
															rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
														}])
													])
			users.once "reset", ->
				expect(users).to.have.length 1
				# Check model attributes
				user = users.at(0)
				expect(user).to.be.ok				
				expect(user.get("name")).to.contain("Guzman Monne")
				expect(user.get("email")).to.contain("guzmonne@hotmail.com")
				expect(user.get("phone")).to.contain("6967896")
				expect(user.get("cellphone")).to.contain("789456312")
				expect(user.get("rememberToken")).to.contain("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31")
				expect(user.get("id")).to.be.a("number")
				expect(user.get("createdAt")).to.be.a("Date")
				expect(user.get("updatedAt")).to.be.a("Date")
				done()

			users.fetch {reset: true}

	describe "creation", ->
		it "has default values", ->
			expect(@users).to.be.ok
			expect(@users).to.have.length 0

		it "should be empty on fetch", (done) ->
			users = @users

			# Returns a single model on GET
			@server.respondWith("GET", "/api/users", [
													200,
													{"Content-Type": "application/json"},
													JSON.stringify([{
															name: "Guzman Monne",
															email: "guzmonne@hotmail.com",
															phone: "6967896",
															cellphone: "789456312",
															rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
														}])
													])
			users.once "reset", ->
				expect(users).to.have.length 1
				# Async code has completed. Singal test is done
				done()

			expect(users).to.have.length 0
			users.fetch {reset: true}

	describe "modification", ->
		beforeEach ->
			# Load pre-existing user
			@users.add({
				name: "Guzman Monne",
				email: "guzmonne@hotmail.com",
				phone: "6962030", 
				cellphone: "099750505",
				rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			})

		afterEach ->
			@users = null
			@users = new App.Collections.Users

		it "can delete a user", (done) ->
			users = @users

			# After shift
			users.once "remove", ->
				expect(users).to.have.length 0
				done()

			# Remove and return first model
			user = users.shift()
			expect(user).to.be.ok

		it "can create a second user"