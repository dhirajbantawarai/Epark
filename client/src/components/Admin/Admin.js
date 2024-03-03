import React from 'react'
import {NavLink} from 'react-router-dom';

export const Admin = () => {
  return (
    <>
    <NavLink to="/managebooking">
        <h2>Show Booking</h2>
    </NavLink>
    <NavLink to="/manageusers">
        <h2>Show Users</h2>
    </NavLink>
    <br></br>
    <br></br>
    </>
  )
}
