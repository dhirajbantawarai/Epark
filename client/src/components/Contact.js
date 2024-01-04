import React from "react";
import "../styles/contact.css";
export const Contact = () => {
  return (
    <>
      <div className="contact-page">
        <div className="contactbox">
          <h1>Contact Us</h1>

          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>

              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>

              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>

              <textarea
                id="message"
                name="message"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
