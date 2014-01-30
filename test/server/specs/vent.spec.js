var Client, EventEmitter, chai, events, expect, sinon, sinonChai, util, vent;

vent = require('../../../vent');

events = require('events');

EventEmitter = events.EventEmitter;

util = require('util');

chai = require('chai');

sinonChai = require("sinon-chai");

sinon = require("sinon");

expect = chai.expect;

chai.use(sinonChai);

Client = function() {
  this.req = {
    headers: {},
    session: {
      user: {
        email: "example@hotmail.com",
        firstName: "John",
        _id: "1",
        lastName: "Doe",
        username: "jdoe"
      }
    }
  };
  this.send = function(data) {
    return "data";
  };
  return this;
};

util.inherits(Client, EventEmitter);

beforeEach(function() {
  return this.client = new Client();
});

afterEach(function() {
  var clientID, _results;
  delete this.client;
  _results = [];
  for (clientID in vent.clients) {
    _results.push(delete vent.clients[clientID]);
  }
  return _results;
});

describe("Vent", function() {
  it("should have a clients Object", function() {
    return expect(vent.clients).to.be.an("object");
  });
  beforeEach(function() {
    return vent.addClient(this.client);
  });
  describe("addClient(client: Object)", function() {
    it("should set the id of the client", function() {
      return expect(this.client.id).to.be.ok;
    });
    it("should add the client to the clients Object", function() {
      return expect(vent.clients["1"]).to.equal(this.client);
    });
    return it("should add a 'close' listener to the client to auto-delte itself when called", function() {
      var closeTimeout, id;
      id = this.client.id;
      closeTimeout = setTimeout(function() {
        return expect(vent.clients[id]).to.not.exist;
      }, 1000);
      return vent.clients[id].emit('close');
    });
  });
  describe("connectClient(client: Object)", function() {
    it("should set the id of the client if is not set", function() {
      var client;
      client = new Client();
      expect(client.id).to.not.exist;
      vent.connectClient(client);
      return expect(client.id).to.exist;
    });
    it("should subscribe the client to previously stored subscriptions");
    return it("should create an Array of subscriptions called 'sseSubs'");
  });
  describe("_getOrSetId(client: Object)", function() {
    it("should set the last-event-id as id if defined");
    return it("should set the user._id as id if last-event-id is not defined", function() {
      expect(this.client.req.headers['last-event-id']).to.not.exist;
      vent._getOrSetId(this.client);
      return expect(this.client.id).to.equal("1");
    });
  });
  describe("subscribeClient(client: Object, subscription: String)", function() {
    return it("shoud create an event called subscription that would call the client send function", function() {
      var closeTimeout, object, result, spy;
      object = {
        data: "Test"
      };
      spy = sinon.spy(this.client, "send");
      closeTimeout = setTimeout(function() {
        return expect(spy).to.have.been.calledOnce;
      }, 1000);
      vent.subscribeClient(this.client, "test");
      return result = this.client.emit("test", object);
    });
  });
  describe("subscribe(clientID: String, subscription: String)", function() {
    return it("should call the subscribe function passing the client and the subscription if the client is not already subscribed");
  });
  return describe("propagateEvent(eventData: Object)", function() {
    return it("should iterate over the clients an emit the event defined by the eventData.srcEvent and pass the eventData.data as a parameter");
  });
});
