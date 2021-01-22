import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MERN</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Item 1</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Item 2</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Item 3</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Item 4</Link>
              </li>
            </ul> 
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul> 
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header