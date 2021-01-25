const express = require('express')
const mongoose = require('mongoose')
const apiRoute = require('./routes/api')
const authRoute = require('./routes/auth')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

mongoose.connect(process.env.DB, {useNewUrlParser: true})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
}) */

app.use(express.json())
app.use(cors())
app.use('/api', apiRoute)
app.use(authRoute)

app.use((req, res, next) => {
  res.send('Welcome to server')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})