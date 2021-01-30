import React from 'react'
import { Link } from 'react-router-dom'

import done from '../assets/images/done.svg'

const CartPage = () => {
  return (
    <div className="py-4">
      <h2><img src={done} className="checkout-done-image" alt="done" /> Your order is received, thank you!</h2>
      <hr/>
      <Link to="/">Continue to shopping</Link>
    </div>
  )
}

export default CartPage