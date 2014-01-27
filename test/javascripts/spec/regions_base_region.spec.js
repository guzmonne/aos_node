describe("App.Regions.BaseRegion", function(){
	beforeEach(function(){
		this.baseRegion = new App.Regions.BaseRegion();
		this.oldView = new App.Views.BaseView();
		this.newView = new App.Views.BaseView();
		this.view = new App.Views.BaseView();
		this.view.template = function(model){return 'Test'};
	});

	after(function(){
		this.baseRegion = null;
	});

	afterEach(function(){
		this.baseRegion.remove();
		this.oldView.remove();
		this.newView.remove();
		this.view.remove();
		$('#fixtures').empty();
	});

	describe("initialize(options)", function(){
		it("should set the 'container' if passed", function(){
			var baseRegion = new App.Regions.BaseRegion();
			expect(baseRegion.container).to.be.null;
			
			baseRegion = new App.Regions.BaseRegion({container: "something"});
			expect(baseRegion.container).to.equal("something");
		});
		it("should set the 'currentView' if passed", function(){
			var view       = new App.Views.BaseView();
			var baseRegion = new App.Regions.BaseRegion();
			expect(baseRegion.currentView).to.be.null;
			baseRegion = new App.Regions.BaseRegion({currentView: view});
			expect(baseRegion.currentView).to.equal(view);
		});
	});

	describe("swapCurrentView(newView)", function(){
		it("should swap the views if currentView is empty", function(){
			var newView = this.newView;
			this.baseRegion.swapCurrentView(newView);
			expect(this.baseRegion.currentView).to.equal(newView);
		});
		it("should remove the currentView", function(){
			this.baseRegion.currentView = this.oldView;
			// Empty stub for view removal to prevent side effects
			sinon.stub(this.oldView, "remove");
			this.baseRegion.swapCurrentView(this.newView);
			expect(this.oldView.remove).to.be.calledOnce;
		});
		it("should swap the views and close the oldView", function(){
			var newView = this.newView;
			var oldView = this.oldView;
			this.baseRegion.currentView = oldView;
			this.baseRegion.swapCurrentView(newView);
			expect(this.baseRegion.currentView).to.equal(newView);
		});
	});

	
	describe("renderView()", function(){
		it("should render the currentView in the container", function(){
			// If container or currentView is empty return
			this.baseRegion.render();
			expect($('#fixtures').html()).to.equal('');
			// Render view in region
			var view = new App.Views.BaseView({el: '#fixtures'});
			view.template = function(){
				return '<p>Test</p>';
			};
			this.baseRegion.container = '#fixtures';
			this.baseRegion.currentView = view;
			this.baseRegion.renderView();
			expect($('#fixtures').html()).to.equal('<p>Test</p>');
		});
	});

	describe("swapView(newView: View)", function(){
		it("should throw an error if the container or the currentView is not set", function(){
			expect(function(){this.baseRegion.renderView()}).to.throw(Error);
			this.baseRegion.container = '#fixtures';
			expect(function(){baseRegion.renderView()}).to.throw(Error);
		});
		it("should set the newView as the currentView if there isn't one set", function(){
			expect(this.baseRegion.currentView).to.not.exist;
			this.baseRegion.container = '#fixtures';
			this.baseRegion.renderView(this.view);
			expect(this.baseRegion.currentView).to.exist;
		});
		it("should render the currentView if no 'view' is passed", function(){
			this.baseRegion.container = '#fixtures';
			this.view.model = new App.Models.Application;
			this.baseRegion.currentView = this.view;
			this.baseRegion.renderView();
			expect($('#fixtures').html()).to.equal('<div>Test</div>');
		});
		it("should call the swapCurrentView function once", function(){
			sinon.spy(this.baseRegion, "swapCurrentView");
			this.baseRegion.container = '#fixtures';
			this.baseRegion.swapView(this.view);
			expect(this.baseRegion.swapCurrentView).to.have.been.calledOnce;
			this.baseRegion.swapCurrentView.restore();
		});
		it("should call the render function once", function(){
			sinon.spy(this.baseRegion, "renderView");
			this.baseRegion.container = '#fixtures';
			this.baseRegion.swapView(this.view);
			expect(this.baseRegion.renderView).to.have.been.calledOnce;
			this.baseRegion.renderView.restore();
		});
	});
});