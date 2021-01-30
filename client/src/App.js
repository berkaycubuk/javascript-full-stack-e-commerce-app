import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import userStore from './store/user'
import cartStore from './store/cart'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import CheckoutDonePage from './pages/CheckoutDone'

function App() {
  const { setUser } = userStore()
  const { setList } = cartStore()

  useEffect(() => {
    const token = Cookies.get('token')
    let list = Cookies.get('cartList')
    
    if (list != undefined ) {
      list = JSON.parse(list)

      if (list.length > 0 && list != undefined) {
        setList(list)
      }
    }

    if (token && token != undefined) {
      const user = jwt.decode(token)
      setUser({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    }
  }, [])

  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/product/:slug">
            <ProductPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/checkout-done">
            <CheckoutDonePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App
