import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import userStore from '../store/user'
import cartStore from '../store/cart'

import shoppingCart from '../assets/images/shopping-cart.svg'

const Header = () => {
  const { items, itemList, totalPrice } = cartStore()
  const { user, setUser } = userStore()

  const logout = () => {
    Cookies.remove('token')
    setUser(undefined)
  }
  
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
              {user == undefined ? 
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </> 
                : 
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={logout}>Logout</a>
                  </li>
                </> 
              }
              
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={ shoppingCart } /> Cart <span className="badge badge-light">{ itemList.length }</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div className="list-group">
                    { itemList.map((product, index) => 
                      <Link to={`/product/${product.slug}`} key={index} className="list-group-item list-group-item-action">{ product.title }</Link>
                    ) }
                  </div>
                  <div className="header-total-price">
                    { itemList.length ? 'Total: ' + totalPrice : null }$
                  </div>
                  <Link className="dropdown-item" to="/cart">Go to cart</Link>
                </div>
              </div>
            </ul> 
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header