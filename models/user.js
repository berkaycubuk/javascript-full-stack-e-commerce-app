const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  tokens: [
    {
      token: String
    }
  ]
})

UserSchema.static.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      return user
    } else {
      throw new Error('Unable to login')
    }
  } else {
    throw new Error({ error: 'Unable to login' })
  }
}

UserSchema.methods.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 8)
}

UserSchema.methods.generateAuthToken = async () => {
  const user = this

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.AUTHTOKENSTRING
  )
  user.tokens = user.tokens.concat({ token })

  try {
    await user.save()
  } catch (error) {
    throw new Error(error)
  }

  return token
}

UserSchema.methods.toJSON = () => {
  const user = this
  const userObject = user.toObject()

  return userObject.tokens
}

const User = mongoose.model('user', UserSchema)

module.exports = User