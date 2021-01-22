/* import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import routes from './routes/api'
import dotenv from 'dotenv'
dotenv.config() */
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/api')
const path = require('path')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

mongoose.connect(process.env.DB, {useNewUrlParser: true})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/api', routes)

app.use((req, res, next) => {
  res.send('Welcome to server')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})