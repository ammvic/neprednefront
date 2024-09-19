import React from 'react'
import './pageStyles/home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='home'>
      <div className='top'>
        <div className='frame'>
          <section className='opening'>
            <h1>Your moments imortalized by our lenses</h1>
            <h3>The better way for modern photographers to share, deliver, proof and sell online.</h3>
          </section>
          <section className='btn'>
            <button><Link to="/register">Get Started</Link></button>
          </section>
        </div>
      </div>
    </div>
    <div className='design'>
      <h1>Designed to impress</h1>
      <h3>Dedicated online photo gallery for each of your clients, with beautiful cover and layout right out of the box.</h3>
      <div className='gallery-design'>
        <img className="gallery-img" src="./gallery.png" alt="Gallery Design" />
      </div>
    </div>
    </>
  )
}

export default Home