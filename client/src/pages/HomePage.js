import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import slide1 from '../assets/images/slide-1.jpg'
import slide2 from '../assets/images/slide-2.jpg'
import slide3 from '../assets/images/slide-3.jpg'
import product1 from '../assets/images/product-1.jpg'

import ProductCard from '../components/ProductCard'

const product = {
  image: product1,
  title: 'Camera',
  slug: 'camera'
}

const HomePage = () => {
  const [products, setProducts] = useState()
  const [fetched, setFetched] = useState(false)

  if(!fetched) {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data)
        setFetched(true)
      })
  }

  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={ slide1 } class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={ slide2 } class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={ slide3 } class="d-block w-100" alt="..." />
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <section className="my-4">
        <h2>Popular Items</h2>
        <p>See best selling items.</p>

        <div className="row">

          { fetched ? products.map((product, index) => 
            <div key={index} className="col-12 col-sm-4">
              <ProductCard product={product} />
            </div>
          ) : null }

        </div>
      </section>
    </>
  )
}

export default HomePage