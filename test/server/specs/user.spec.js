var chai, expect, sinon, sinonChai, vent;

vent = require('../../../vent');

chai = require('chai');

sinonChai = require("sinon-chai");

sinon = require("sinon");

expect = chai.expect;

chai.use(sinonChai);

describe("User Router", function() {
  return describe("User Index", function() {
    return it("should call the Vent.subscribe() function to the client passing 'users:new' as a parameter");
  });
});
