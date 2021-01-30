import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import shoppingCart from '../assets/images/shopping-cart.svg'

import cartStore from '../store/cart'
import userStore from '../store/user'

const CartPage = () => {
  const { itemList, totalPrice, deleteItem, empty } = cartStore()
  const { user } = userStore()
  const [checkoutDone, setCheckoutDone] = useState(false)
  
  const checkout = () => {
    if (!user) {
      alert('You have to login to checkout!')
    } else {
      empty()
      setCheckoutDone(true)
    }
  }

  const deleteProduct = item => () => {
    deleteItem(item)
  }

  if (checkoutDone) {
    return <Redirect to="/checkout-done" />
  }

  return (
    <div className="py-4">
      <h2>Cart</h2>
      <hr/>
      {itemList.length > 0 ?
        <>
          <ul className="list-group">
            {itemList.map((item, index) => (
              <li className="list-group-item" key={index}><Link to={`/product/${item.slug}`}>{item.title}</Link> - <a href="#" className="text-danger" onClick={deleteProduct(item)}>Delete</a></li>
            ))}
          </ul>
          <hr/>
          <div className="font-weight-bold">Total: { totalPrice }$</div>
          <button type="button" className="btn btn-primary btn-lg my-4" onClick={ checkout }><img src={ shoppingCart } className="mr-2" />Checkout</button>
        </>
       : 
       <>
        <h4>Your cart is empty</h4>
       </>}
    </div>
  )
}

export default CartPage