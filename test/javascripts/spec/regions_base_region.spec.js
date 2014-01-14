describe("App.Regions.BaseRegion", function(){
	beforeEach(function(){
		this.baseRegion = new App.Regions.BaseRegion();
		this.oldView = new App.Views.BaseView();
		this.newView = new App.Views.BaseView();
	});

	after(function(){
		this.baseRegion = null;
	});

	afterEach(function(){
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

	describe("render", function(){
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
			this.baseRegion.render();
			expect($('#fixtures').html()).to.equal('<p>Test</p>');
		});
	});

	describe("swapAndRenderCurrentView(newView)", function(){
		it("should call the swapCurrentView function once", function(){
			sinon.spy(this.baseRegion, "swapCurrentView");
			this.baseRegion.swapAndRenderCurrentView(new App.Views.BaseView({el: '#fixtures'}));
			expect(this.baseRegion.swapCurrentView).to.have.been.calledOnce;
			this.baseRegion.swapCurrentView.restore();
		});
		it("should call the render function once", function(){
			sinon.spy(this.baseRegion, "render");
			this.baseRegion.swapAndRenderCurrentView(new App.Views.BaseView({el: '#fixtures'}));
			expect(this.baseRegion.render).to.have.been.calledOnce;
			this.baseRegion.render.restore();
		});
	});
});