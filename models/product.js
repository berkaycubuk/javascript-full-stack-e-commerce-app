const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  slug: String,
  title: String,
  description: String,
  images: [],
  price: Number,
  stock: Number
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product