const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  jwt.sign()
})