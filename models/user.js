const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const salt = 10
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: 1
  },
  password: {
    type: String,
    required: true
  },
  token: String
})

UserSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const User = mongoose.model('user', UserSchema)

module.exports = User