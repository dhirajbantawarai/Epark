import React, { useState } from "react";
import "../styles/login.css";
import { useProductContext } from "../context/StoreContext";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const { loginUser } = useProductContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    if (username ==="" && password ==="") {
      alert("Cannot submit empty fields");
    }else{

      loginUser(username, password);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="loginbox">
          <h2>Login</h2>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <NavLink to="/signup">

            <span className="forget-password">
              Register Now!
            </span>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};
