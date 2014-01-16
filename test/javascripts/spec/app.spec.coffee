describe "App", ->
	it "provides the 'App' object and basic app functionalities",  ->
		expect(window.App).to.be.an 'object'
		expect(window.App).to.include.keys("Config",
																			 "Collections",
																			 "Models", 
																			 "Routers", 
																			 "Views", 
																			 "Regions")	