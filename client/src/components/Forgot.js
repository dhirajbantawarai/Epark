
import React, { useState } from "react";
import "../styles/forgot.css";


export const Forgot = () => {
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");

  const securityQuestion = "What is the of your favourite food?"; // Replace with your actual security question

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to handle the form submission
    console.log("Username:", username);
    console.log("Answer:", answer);
    // Add further processing or API calls as needed
  };

  return (
    <>
    <div className="que-box">
          <form className="que-form" onSubmit={handleSubmit}>
            <div >
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="securityQuestion">Security Question:</label>
              <p>{securityQuestion}</p>
            </div>
            <div>
              <label htmlFor="answer">Answer:</label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
    </div>
    </>
  );
};
