import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import cartStore from '../store/cart'

import '../assets/scss/styles.scss'

import notFoundImage from '../assets/images/imagenotfound.png'
import productImage1 from '../assets/images/product-1.jpg'
import productImage2 from '../assets/images/product-2.jpg'
import productImage3 from '../assets/images/product-3.jpg'
import shoppingCart from '../assets/images/shopping-cart.svg'

const ProductPage = () => {
  const { slug } = useParams()
  const { addNewItem } = cartStore()
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 10,
    images: []
  })
  const [fetched, setFetched] = useState(false)

  const addToCart = () => {
    addNewItem(product)
  }

  if(!fetched) {
    axios.get(`http://localhost:5000/api/products/get/${slug}`)
      .then(res => {
        setProduct(res.data)
        setFetched(true)
      })
  }

  return (
    <>
      <div className="row my-4">
        <div className="col-6">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            
              {fetched && product.images.length > 0 ?
                <>
                  <ol class="carousel-indicators">
                    {product.images.map((image, index) => (
                      <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index == 0 ? 'active' : null}></li>
                    ))}
                  </ol>
                  <div className="carousel-inner">
                    {product.images.map((image, index) => (
                      <div key={index} className={`carousel-item ${index == 0 ? 'active' : null}`}>
                        <img src={image} className="d-block w-100" alt="product image" />
                      </div>
                    ))}
                  </div>
                </>
              : 
                <>
                  <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={ notFoundImage } className="d-block w-100" alt="..." />
                    </div>
                  </div>
                </>
              }

            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="col-6">
          <h2>{ product.title }</h2>
          <div className="product-stock">
            Stock: { product.stock } items
          </div>
          <div className="product-price">
            { product.price } <span className="product-price-currency">$</span>
          </div>
          <button type="button" className="btn btn-primary btn-lg my-4" onClick={ addToCart }><img src={ shoppingCart } className="mr-2" />Add to cart</button>
        </div>
      </div>

      <div className="mb-4">
        <h4>Description</h4>
        <hr/>
        <p>{ product.description }</p>
      </div>
    </>
  )
}

export default ProductPage