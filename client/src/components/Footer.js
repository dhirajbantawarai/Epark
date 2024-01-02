import React from "react";
import "../styles/footer.css";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <p className="footer-text">© {new Date().getFullYear()} - E-Parking</p>
      </footer>
    </>
  );
};
