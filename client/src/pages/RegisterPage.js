import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // post request
    axios.post('http://localhost:5000/api/register', {
      name: name,
      email: email,
      password: password
    }).then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <>
      <form className="my-5" onSubmit={handleSubmit}>
        <h3 className="mb-4">Create new MERN account</h3>
        <div className="form-group">
          <label for="registerName">Name</label>
          <input type="text" className="form-control" id="registerName" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="registerEmail">E-mail</label>
          <input type="email" className="form-control" id="registerEmail" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="registerPassword">Password</label>
          <input type="password" className="form-control" id="registerPassword" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <p className="mt-2">If you already have an account please <Link to="/login">login</Link>.</p>
      </form>
    </>
  )
}

export default RegisterPage
