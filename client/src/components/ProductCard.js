import React from 'react'
import { Link } from 'react-router-dom'

import notFoundImage from '../assets/images/imagenotfound.png'

const ProductCard = (props) => {
  return (
    <div className="card">
      <img src={ props.product.images.length ? props.product.images[0] : notFoundImage } className="card-img-top" alt={ props.product.title } />
      <div className="card-body">
        <p className="card-text font-weight-bold">{ props.product.title }</p>
        <Link to={ `/product/${props.product.slug}` } className="btn btn-primary">Buy - { props.product.price }$</Link>
      </div> 
    </div>
  )
}

export default ProductCard