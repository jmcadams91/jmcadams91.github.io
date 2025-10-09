const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [emailRegex, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  hash: String,
  salt: String
});

// Note: mongoose-unique-validator was removed because it is incompatible with Mongoose v7+
// We rely on the unique index and MongoDB duplicate key errors (code 11000) instead.

// Method to securely set a password
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// Method to validate a submitted password
userSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

// Method to generate a signed JWT for the user
userSchema.methods.generateJWT = function() {
  return jwt.sign(
    { // Payload for our JWT 
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.JWT_SECRET, // SECRET stored in .env file
    { expiresIn: '1h' }     // Token expires an hour from creation
  );
};

const User = mongoose.model('users', userSchema);
module.exports = User;

