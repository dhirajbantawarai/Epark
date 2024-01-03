import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";

import { useProductContext } from "../context/StoreContext";
export const Navbar = () => {
  const { logout } = useProductContext();
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h2>E-park </h2>
        </div>
        <div>
          <ul>
            <NavLink to="/">
              <li>
                <a>Home</a>
              </li>
            </NavLink>

            <NavLink to="/contact">
              <li>
                <a>Contact</a>
              </li>
            </NavLink>

            <li>
              <button onClick={() => logout()} className="logoutbtn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
