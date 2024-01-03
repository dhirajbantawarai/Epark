
import React, { useState } from "react";
import "../styles/login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
      try {
        const response = await fetch('http://localhost:9000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // Handle non-successful responses (e.g., show an error message)
            const errorData = await response.json();
            console.log(response);
            window.alert('Login failed:'+ errorData.message);
            // Display error message to the user
            return;
        }

        const userData = await response.json();
        if(userData){
          window.location.href = 'http://localhost:3000/parking';
        }else{
          window.alert('Server error: Try again Later');
        }

        
        // Redirect or perform further actions upon successful login
    } catch (error) {
        console.error('Error during login:', error.message);
        // Handle unexpected errors (e.g., show a generic error message)
    }
  };

  return (
    <>
      <div className="login-page">
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
          <button type="submit">Login</button>
          <a href="*" className="forget-password">
            Forget password?
          </a>
        </form>
      </div>
    </>
  );
};
