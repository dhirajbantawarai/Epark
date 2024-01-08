import React from 'react'
import { BsCarFront } from "react-icons/bs";
import "../styles/car.css";
import { NavLink } from 'react-router-dom';



export const Car = () => {

  return (
    <>
    <NavLink to="/book">
    <div className='car'>
        <BsCarFront color="orange" size={90}/>
    </div>

    </NavLink>
    </>
  )
}
