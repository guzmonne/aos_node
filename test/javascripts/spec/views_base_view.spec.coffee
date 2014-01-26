describe "App.Views.BaseView", ->
	beforeEach ->
		@view = new App.Views.BaseView()

	afterEach ->
		delete @view

	it "should contain an innverViews array", ->
		expect(@view.innerViews).to.be.instanceof(Array)

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