import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <>
      <form className="my-5">
        <h3 className="mb-4">Create new MERN account</h3>
        <div className="form-group">
          <label for="registerEmail">E-mail</label>
          <input type="email" class="form-control" id="registerEmail" />
        </div>
        <div className="form-group">
          <label for="registerPassword">Password</label>
          <input type="password" class="form-control" id="registerPassword" />
        </div>
        <button class="btn btn-primary">Register</button>
        <p class="mt-2">If you already have an account please <Link to="/login">login</Link>.</p>
      </form>
    </>
  )
}

export default RegisterPage
