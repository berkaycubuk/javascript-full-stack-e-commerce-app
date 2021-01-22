// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  }
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product