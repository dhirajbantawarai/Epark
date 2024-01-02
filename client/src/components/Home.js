import React from 'react'
import "../styles/home.css";

export const Home = () => {

  return (
    <>
     <section className="hero">
      <div className="hero-container">
        <div className="column-left">
          <h1>Your Parking Friend!!</h1>
          <p>
            No contracts or unwanted fees. Exclusive offer for new customers.
          </p>
          <div className='buttons'>

          <a href="/login"><button>Login</button></a>
          
          <a href="/login"><button>SignUp</button></a>
          </div>
        </div>
        <div className="column-right">
          <img
            src="../image-1.svg"
            alt="illustration
        "
            className="hero-image"
          />
        </div>
      </div>
    </section> 
    </>
  )
}
