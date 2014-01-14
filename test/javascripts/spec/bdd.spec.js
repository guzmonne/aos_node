function check(done, f){
	try {
		f();
		done();
	} catch(e) {
		done(e);
	}
}

describe("BDD Example", function(){
	// Runs once before all tests starts
	before(function(){
		this.hello = function(){
			return "Hello, World!";
		};
	});

	// Runs once when all tests finish
	after(function(){
		this.hello = null;
	});

	it("should return expected string result", function(){
		expect(this.hello()).to
			.be.a("string").and
			.equal("Hello, World!");
	});
});