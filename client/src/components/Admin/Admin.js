import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/admin.css';


export const Admin = () => {
  return (
    <div className="admin-container">
      <NavLink to="/managebooking">
        <button className="admin-button">Show Booking</button>
      </NavLink>
      <NavLink to="/manageusers">
        <button className="admin-button">Show Users</button>
      </NavLink>
      <br />
      <br />
    </div>
  );
};
