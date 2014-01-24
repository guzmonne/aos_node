// ===================
// MODULE DEPENDENCIES
// ===================
var mongoose      = require('mongoose');
var mongooseTimes = require('mongoose-times');
var Schema        = mongoose.Schema;
var crypto        = require('crypto');

// ===========
// USER SCHEMA
// ===========
var UserSchema = new Schema({
  firstname      : { type: String },
  lastname       : { type: String },
  email          : { type: String },
  username       : { type: String },
  hashed_password: { type: String },
  salt           : { type: String },
  createdBy      : { type: String }
});
UserSchema.plugin(mongooseTimes);

// ========
// VIRTUALS
// ========
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

// ===========
// VALIDATIONS
// ===========
var validatePresenceOf = function (value) {
  return value && value.length
};

// =============
// PRE-SAVE HOOK
// =============
UserSchema.pre('save', function(next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password)
    && !this.doesNotRequireValidation())
    next(new Error('Invalid password'))
  else
    next()
})

// =======
// METHODS
// =======
UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
      return ''
    }
  },

  /**
   * Validation is not required if using OAuth
   */
}

mongoose.model('User', UserSchema)