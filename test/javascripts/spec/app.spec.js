describe('App', function(){
	it("provides the 'App' object and basisc app functionalities", function(){
		// Expect exists and is an object
		expect(window.App).to.be.an('object');

		// Expect all namespace properties are present
		expect(window.App).to.include.keys( "Config"
		                           , "Collections"
		                           , "Models"
		                           , "Routers"
		                           , "Views"
		                           , "Regions");
	});
});