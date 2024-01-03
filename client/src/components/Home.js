import React from "react";
import "../styles/home.css";

export const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="column-left">
            <h1>Welcome to E-Parking!!!</h1>
            <p>Exclusive offer for new customers with no unwanted fees.</p>
            <div className="buttons">
              <a href="/login">
                <button className="btn">Login</button>
              </a>

              <a href="/signup">
                <button className="btn">SignUp</button>
              </a>
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
  );
};
