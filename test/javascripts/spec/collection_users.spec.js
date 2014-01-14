describe("App.Collections.Users", function(){
	beforeEach(function(){
		this.server = sinon.fakeServer.create();
		this.server.autoRespond = true;
		this.users = new App.Collections.Users();
	});

	afterEach(function(){
		this.server.restore();
	});

	describe("retrieval", function(){
		it("has a single user", function(done){
			var users = this.users, user;

			// Returns a single model on GET
			this.server.respondWith("GET", "/api/users", [
			                        200, 
			                        {"Content-Type": "application/json"}, 
			                        JSON.stringify([{
			                        	name: "Guzman Monne", 
			                        	email: "guzmonne@hotmail.com",
			                        	phone: "6967896", 
			                        	cellphone: "789456312",
			                        	rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			                        }])
			                        ]);
			// After fetch
			users.once("reset", function(){
				expect(users).to.have.length(1);

				// Check model attributes
				user = users.at(0);
				expect(user).to.be.ok;
				expect(user.get("name")).to.contain("Guzman Monne");
				expect(user.get("email")).to.contain("guzmonne@hotmail.com");
				expect(user.get("phone")).to.contain("6967896");
				expect(user.get("cellphone")).to.contain("789456312");
				expect(user.get("rememberToken")).to.contain("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31");
				expect(user.get("id")).to.be.a("number");
				expect(user.get("createdAt")).to.be.a("Date");
				expect(user.get("updatedAt")).to.be.a("Date");
				done();
			});

			users.fetch({reset: true});
		});
	});

	describe("creation", function(){
		it("has default values", function(){
			expect(this.users).to.be.ok;
			expect(this.users).to.have.length(0);
		});

		it("should be empty on fetch", function(done){
			var users = this.users;

			this.server.respondWith("GET", "/api/users", [
			                        200, 
			                        {"Content-Type": "application/json"}, 
			                        JSON.stringify([{
			                        	name: "Guzman Monne", 
			                        	email: "guzmonne@hotmail.com",
			                        	phone: "6967896", 
			                        	cellphone: "789456312",
			                        	rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			                        }])
			                        ]);
			
			// "reset" event fires on successful fetch()
			users.once("reset", function(){
				expect(users).to.have.length(1);

				// Async code has completed. Signal test is done
				done();
			});

			expect(users).to.have.length(0);
			
			users.fetch({reset: true});
		});
	});

	describe("modification", function(){
		beforeEach(function(){

			// Load a pre-existing user
			this.users.add({
				name: "Guzman Monne",
				email: "guzmonne@hotmail.com",
				phone: "6962030", 
				cellphone: "099750505",
				rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			});
		});

		afterEach(function(){
			this.users = null;
			this.users = new App.Collections.Users;
		});

		it("has a single user", function(done){
			var users = this.users;

			this.server.respondWith("GET", "/api/users", [
			                        200, 
			                        {"Content-Type": "application/json"}, 
			                        JSON.stringify([{
			                        	name: "Guzman Monne", 
			                        	email: "guzmonne@hotmail.com",
			                        	phone: "6967896", 
			                        	cellphone: "789456312",
			                        	rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			                        }])
			                        ]);
			// After fetch
			users.once("reset", function(){
				expect(users).to.have.length(1);

				// Check model attributes
				user = users.at(0);
				expect(user).to.be.ok;
				expect(user.get("name")).to.contain("Guzman Monne");
				expect(user.get("email")).to.contain("guzmonne@hotmail.com");
				expect(user.get("phone")).to.contain("6967896");
				expect(user.get("cellphone")).to.contain("789456312");
				expect(user.get("rememberToken")).to.contain("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31");
				expect(user.get("id")).to.be.a("number");
				expect(user.get("createdAt")).to.be.a("Date");
				expect(user.get("updatedAt")).to.be.a("Date");
				done();
			});
			//expect(users).to.have.length(2);
			users.fetch({reset: true});
		});

		it("can delete a note", function(done){
			var users = this.users
				, user;

			// After shift
			users.once("remove", function(){
				expect(users).to.have.length(0);
				done();
			});

			// Remove and return first model
			user = users.shift();
			expect(user).to.be.ok;
		});

		it("can create a second note");
	});
});