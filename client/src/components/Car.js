import React from 'react'
import { BsCarFront } from "react-icons/bs";
import "../styles/car.css";
import { NavLink } from 'react-router-dom';



export const Car = ({color}) => {

  return (
    <>
    {color ==="red"?(
      <div className='car disable'>
      <BsCarFront color={color} size={90}/>
      </div>
    ):("")}

    {color ==="grey"?(
         <div className='car disable'>
         <BsCarFront color={color} size={90}/>
     </div>
    ):("")}
      
    {color ==="green"?
    <NavLink to="/book">
    <div className='car'>
        <BsCarFront color={color} size={90}/>
    </div>
    </NavLink>
    :("")
    }
    </>
  )
}
