vent         = require('../../../vent')
#user				 = require('../../../routes/user')

chai         = require('chai')
sinonChai    = require("sinon-chai")
sinon        = require("sinon")
expect       = chai.expect
chai.use sinonChai

describe "User Router", ->

	describe "User Index", ->

		it "should call the Vent.subscribe() function to the client passing 'users:new' as a parameter"
