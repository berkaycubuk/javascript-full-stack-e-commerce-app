const express = require('express')

const router = express.Router()

// Models
const Product = require('../models/product')
const User = require('../models/user')

router.get('/products', (req, res, next) => {
  Product.find({})
    .then(data => res.json(data))
    .catch(next)
})

router.get('/products/get/:slug', (req, res, next) => {
  Product.findOne({ slug: req.params.slug })
    .then(data => res.json(data))
    .catch(next)
})

router.get('/users', (req, res, next) => {
  User.find({}, 'id name')
    .then(data => res.json(data))
    .catch(next)
})

router.get('/users/get/:id', (req, res, next) => {
  User.findOne({ id: req.params.id }, 'id name')
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router