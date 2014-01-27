// ===================
// MODULE DEPENDENCIES
// ===================
var mongoose        = require('mongoose');
var mongooseTimes   = require('mongoose-times');
var validate        = require('mongoose-validator').validate;
var uniqueValidator = require('mongoose-unique-validator');
var Schema          = mongoose.Schema;
var crypto          = require('crypto');

// ==================
// SCHEMA VALIDATIONS
// ==================
var nameValidatior =  [validate(  { message: "debe tener entre 3 y 50 caracteres"}
                                , 'len'
                                , 3
                                , 50
                              )
                      ];

// ===========
// USER SCHEMA
// ===========
var UserSchema = new Schema({
  firstname      : { type: String, required: '{PATH} is required!', validate: nameValidatior },
  lastname       : { type: String, required: '{PATH} is required!', validate: nameValidatior },
  email          : { type: String, required: '{PATH} is required!', unique: true },
  username       : { type: String, required: '{PATH} is required!', validate: nameValidatior, unique: true },
  hashed_password: { type: String },
  salt           : { type: String },
  createdBy      : { type: String }
});
UserSchema.plugin(mongooseTimes);
UserSchema.plugin(uniqueValidator);

// ========
// VIRTUALS
// ========
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

// ==========
// VALIDATION
// ==========
var validatePresenceOf = function (value) {
  return value && value.length
};

var validateLengthOf = function(value) {
  return (value.length > 7);
};

UserSchema.path('hashed_password').validate(function(v){
  if (!validatePresenceOf(this._password)){
    this.invalidate('password', 'debe escribir un password para el usuario');
  }
  if (!validateLengthOf(this._password)){
    this.invalidate('password', 'debe tener más de 7 caracteres');
  }
});

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
    return Math.round((new Date().valueOf() * Math.random())) + '414k4z4M!'
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
}

mongoose.model('User', UserSchema)