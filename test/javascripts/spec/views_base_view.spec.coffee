describe "App.Views.BaseView", ->
	beforeEach ->
		@newView = new App.Views.BaseView({model: new App.Models.Application})
		@newView.template = (model) -> return 'This is a test'
		@view = new App.Views.BaseView()

	afterEach ->
		@view.close()
		$('#fixtures').empty()
		@newView.close()

	it "should contain an innverViews array", ->
		expect(@view.innerViews).to.be.instanceof(Array)

	describe "addInnerView(newView: View)", ->
		it "should add the 'newView' to the innerViews array", ->
			@view.container = "#fixtures"
			@view.addInnerView(@newView)
			expect(@view.innerViews.length).to.equal 1

		it "should throw an error if no view is passed", ->
			expect( -> @view.addInnerView()).to.throw Error

		it "should throw an error if the 'container' property is not defined", ->
			newView = @newView
			expect( -> @view.addInnerView(newView)).to.throw Error

		it "should render the new view in the container", ->
			@view.container = '#fixtures'
			@view.addInnerView(@newView)
			expect($('#fixtures').html()).to.equal '<div>This is a test</div>'

	describe "close()", ->

		it "should call the onClose function once", ->
			@onClose = sinon.spy @view, "onClose"
			@view.close()
			expect(@onClose).to.have.been.calledOnce

		it "should call the beforeClose Function", ->
			@view.beforeClose = -> console.log "Test"
			@beforeClose = sinon.spy @view, "beforeClose"
			@view.close()
			expect(@beforeClose).to.have.been.calledOnce

	describe "onClose()", ->

		it "should call the close() method on the appended views", ->
			appendedView1 = new App.Views.ContentView()
			appendedView2 = new App.Views.ContentView()
			closeSpy1 = sinon.spy appendedView1, "close"
			closeSpy2 = sinon.spy appendedView2, "close"
			@view.innerViews.push appendedView1
			@view.innerViews.push appendedView2
			expect(appendedView1.innerViews).to.be.empty
			expect(appendedView2.innerViews).to.be.empty
			@view.onClose()
			expect(closeSpy1).to.have.been.calledOnce
			expect(closeSpy2).to.have.been.calledOnce

	describe "renderIn(container: String)", ->
		it "should render the template inside the container", ->
			@view.template = HBS['src/templates/test.hbs']
			@view.renderIn('#fixtures')
			result = $('#fixtures').html()
			expect(result).to.equal('<h1>This is a test</h1>')

	describe "dismissAlert(target: String, options: Object)", ->
		it "should return an error if no target is passed", ->
			expect(-> @view.dismissAlert()).to.throw Error
		
		it "should display a default message if no 'options' are passed", ->
			@view.dismissAlert '#fixtures'
			expect($('#fixtures').html()).to.equal "<div class=\"alert alert-info alert-dismissable\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n  <strong>HINT:</strong> You should pass an Object with a message.\n</div>"

		it "should display the 'options.message' if passed", ->
			@view.dismissAlert '#fixtures', 
				message: "Test"
			expect($('#fixtures').html()).to.equal "<div class=\"alert alert-info alert-dismissable\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n  Test\n</div>"
