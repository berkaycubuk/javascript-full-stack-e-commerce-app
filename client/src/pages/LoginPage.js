import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import userStore from '../store/user'

const LoginPage = () => {
  const { setUser } = userStore()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')

    if (token != null) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // post request
    axios.post('http://localhost:5000/api/login', {
      email: email,
      password: password
    }).then(res => {
      if (res.data.message) {
        setMessage({
          type: 'error',
          message: 'E-mail or password is wrong'
        })
      } else {
        Cookies.set('token', res.data.token)
        const user = jwt.decode(res.data.token)
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email
        })
        setMessage({
          type: 'success',
          message: 'Successfully logged in'
        })
        setIsLoggedIn(true)
      }
    })
      .catch(err => console.log(err))
  }

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <>
      <form className="my-5" onSubmit={handleSubmit}>
        {message ? 
          <div className={`alert ${message.type == 'success' ? 'alert-success' : 'alert-danger'}`}>
            {message.message}
          </div> : <></>
        }
        <h3 className="mb-4">Login to your MERN account</h3>
        <div className="form-group">
          <label for="loginEmail">E-mail</label>
          <input type="email" class="form-control" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="loginPassword">Password</label>
          <input type="password" class="form-control" id="loginPassword" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" class="form-check-input" id="loginRemember" />
          <label class="form-check-label" for="loginRemember">Remember me</label>
        </div>
        <button class="btn btn-primary">Login</button>
        <p class="mt-2">If you don't have an account visit our <Link to="/register">register page</Link>.</p>
      </form>
    </>
  )
}

export default LoginPage