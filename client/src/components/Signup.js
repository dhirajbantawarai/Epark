// Signup.js

import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }
    if (!phone) {
      validationErrors.phone = "Phone number is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!favoriteFood) {
      validationErrors.favoriteFood = "Favorite food is required";
    }

    setErrors(validationErrors);

    try {
      if (Object.keys(validationErrors).length === 0) {
        const response = await fetch("http://localhost:9000/api/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // You might need to include additional headers, such as authorization headers
          },
          body: JSON.stringify({
            username,
            phone,
            email,
            password,
            favoriteFood,
          }),
        });

        if (response.status === 201) {
          const resdata = await response.json();
          alert(resdata.message);
          navigate("/login");
        }

        if (!response.ok) {
          // Handle the case where the server returns an error status
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If the request is successful, clear errors
        setErrors({});

        // Additional logic after successful signup
      }
    } catch (error) {
      // Handle any errors that occurred during the signup process
      console.error("Error during signup:", error);

      // You might want to update the state with the error information
      setErrors({
        signup: "An error occurred during signup. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signupbox">
          <h2>Signup</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && (
                <p className="error">{errors.username}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="favoriteFood">Favorite Food:</label>
              <input
                type="text"
                id="favoriteFood"
                value={favoriteFood}
                onChange={(e) => setFavoriteFood(e.target.value)}
                required
              />
              {errors.favoriteFood && (
                <p className="error">{errors.favoriteFood}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Signup
            </button>
            <a href="/login" className="login-link">
              Already have an account? Login here.
            </a>
          </form>
        </div>
      </div>
    </>
  );
};
