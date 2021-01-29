import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import cartStore from '../store/cart'

import '../assets/scss/styles.scss'

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
    stock: 10
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
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={ productImage1 } className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={ productImage2 } className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={ productImage3 } className="d-block w-100" alt="..." />
              </div>
            </div>
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
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Comments</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <p className="py-4">
              { product.description }
            </p>
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem
              veniam, est atque cumque eum delectus sint!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage