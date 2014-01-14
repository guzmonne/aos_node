describe("App.Models.User", function(){
	it("has default values", function(){
		// Create empty user model
		var model = new App.Models.User();

		expect(model).to.be.ok;
		expect(model.get("id")).to
			.be.a('number').and
			.to.exist;
		expect(model.get("name")).to
			.equal("").and
			.to.exist;
		expect(model.get("email")).to.equal("").and
			.to.exist;
		expect(model.get("phone")).to.equal("").and
			.to.exist;
		expect(model.get("cellphone")).to.equal("").and
			.to.exist;
		expect(model.get("rememberToken")).to.equal("").and
			.to.exist;
		expect(model.get("createdAt")).to.be.a("Date").and
			.to.exist;
		expect(model.get("updatedAt")).to.be.a("Date").and
			.to.exist;
	});
	it("sets passed attributes", function(){
		var model = new App.Models.User({
			name: "Guzman Monne",
			email: "guzmonne@hotmail.com",
			phone: "6962030", 
			cellphone: "099750505",
			rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
		});

		expect(model.get("name")).to.equal("Guzman Monne");
		expect(model.get("email")).to.equal("guzmonne@hotmail.com");
		expect(model.get("phone")).to.equal("6962030");
		expect(model.get("cellphone")).to.equal("099750505");
		expect(model.get("rememberToken")).to.equal("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31");
	});
});