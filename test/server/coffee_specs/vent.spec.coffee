vent         = require('../../../vent')
events       = require('events')
EventEmitter = events.EventEmitter
util         = require('util')
chai         = require('chai')
sinonChai    = require("sinon-chai")
sinon        = require("sinon")
expect       = chai.expect
chai.use sinonChai


Client = ->
  @req =
    headers: {}
    session:
      user:
        email: "example@hotmail.com"
        firstName: "John"
        _id: "1"
        lastName: "Doe"
        username: "jdoe"
  @send =  (data) -> return "data"
  return this

util.inherits(Client, EventEmitter)

beforeEach ->
	@client = new Client()

afterEach ->
	delete @client
	for clientID of vent.clients
		delete vent.clients[clientID]

describe "Vent", ->
	it "should have a clients Object", ->
		expect(vent.clients).to.be.an("object")

	beforeEach ->
		vent.addClient(@client)

	describe "addClient(client: Object)", ->
		it "should set the id of the client", ->
			expect(@client.id).to.be.ok

		it "should add the client to the clients Object", ->
			expect(vent.clients["1"]).to.equal @client

		it "should add a 'close' listener to the client to auto-delte itself when called", ->
			id = @client.id
			closeTimeout = setTimeout ->
				expect(vent.clients[id]).to.not.exist
			, 1000
			vent.clients[id].emit 'close'

	describe "connectClient(client: Object)", ->
		it "should set the id of the client if is not set", ->
			client = new Client()
			expect(client.id).to.not.exist
			vent.connectClient(client)
			expect(client.id).to.exist

		it "should subscribe the client to previously stored subscriptions"

		it "should create an Array of subscriptions called 'sseSubs'"

	describe "_getOrSetId(client: Object)", ->

		it "should set the last-event-id as id if defined"

		it "should set the user._id as id if last-event-id is not defined", ->
			expect(@client.req.headers['last-event-id']).to.not.exist
			vent._getOrSetId(@client)
			expect(@client.id).to.equal "1"

	describe "subscribeClient(client: Object, subscription: String)", ->

		it "shoud create an event called subscription that would call the client send function", ->
			object = {data: "Test"}
			spy = sinon.spy @client, "send" 
			closeTimeout = setTimeout ->
				expect(spy).to.have.been.calledOnce
			, 1000
			vent.subscribeClient @client, "test" 
			result = @client.emit "test", object

	describe "subscribe(clientID: String, subscription: String)", ->
		it "should call the subscribe function passing the client and the subscription if the client is not already subscribed"

	describe "propagateEvent(eventData: Object)", ->

		it "should iterate over the clients an emit the event defined by the eventData.srcEvent and pass the eventData.data as a parameter"


