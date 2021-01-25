import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <form className="my-5" onSubmit={handleSubmit}>
        <h3 className="mb-4">Login to your MERN account</h3>
        <div className="form-group">
          <label for="loginEmail">E-mail</label>
          <input type="email" class="form-control" id="loginEmail" onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label for="loginPassword">Password</label>
          <input type="password" class="form-control" id="loginPassword" onChange={handlePasswordChange} />
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