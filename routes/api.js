// import express from 'express'
const express = require('express')

const router = express.Router()

// Models
// import Product from '../models/product'
const Product = require('../models/product')

router.get('/products', (req, res, next) => {
  Product.find({}, 'title')
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router