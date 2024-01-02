import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";
export const Navbar = () => {
  return (
    <>
    <div className="navbar">

      <div className="logo">
        <h2 >E-park </h2>
      </div> 
      <div>

      <ul>
        <li><a className="active" href="\">Home</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/aboutus">About</a></li>
      </ul>
      </div>
    </div>
    </>
  );
};
