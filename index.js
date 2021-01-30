const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const apiRoute = require('./routes/api')
const User = require('./models/user')
const Upload = require('./models/upload')
const { auth } = require('./middlewares/auth')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

mongoose.connect(process.env.DB, {useNewUrlParser: true})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors())
app.use('/api', apiRoute)
// app.use(authRoute)

// Register
app.post('/api/register', (req, res) => {
  const newUser = new User(req.body)
  newUser.password = bcrypt.hashSync(req.body.password, 10)

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      user.password = undefined
      return res.json(user)
    }
  })
})

// Login
app.post('/api/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err
    if (!user || !user.comparePassword(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Auth failed. Invalid user or password' })
    }
    return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs') })
  })
})

// Logout
app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err)
    res.sendStatus(200)
  })
})

// Fetch
app.get('/api/profile', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  })
})

app.get('/api/uploads/:slug', (req, res) => {
  let slug = req.params.slug

  Upload.findOne({
    slug: slug
  }, (err, upload) => {
    if (err) throw err
    if (!upload) return res.status(400).json({message: 'Upload not found'})

    fs.readFile(`./uploads/${upload.fileName}`, (err, data) => {
      if (err) throw err

      return res.type('jpg').send(data)
    })
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})