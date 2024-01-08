import React from 'react'
import { Car } from './Car'
import "../styles/parking.css";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/StoreContext";


export const Parking = () => {

  const {user, userid } = useProductContext();
  const navigate = useNavigate(); // Initialize useNavigate

  if(userid !==""){
    
    return (
      <>
      <div className='parking-container'>
          <div className='grid grid-six column'>
  
          {(() => {
          const carComponents = [];
          for (let index = 0; index < 30; index++) {
              carComponents.push(<Car key={index} />);
          }
          return carComponents;
          })()}
              
          </div>
      </div>
      </>
    )
  }else if(userid===""){
    return <h1>Please <a href="/login">Login</a></h1>
  }
  
}
