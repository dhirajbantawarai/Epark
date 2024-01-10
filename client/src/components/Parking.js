import React, { useEffect, useState } from 'react'
import { Car } from './Car'
import "../styles/parking.css";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/StoreContext";


export const Parking = () => {

  //localhost:9000/api/booking/spots/

  const {user, userid } = useProductContext();
  const navigate = useNavigate(); // Initialize useNavigate
  const [Spot, setSpot] = useState();

  useEffect(() => {
    if (userid === "") {
      navigate("/");
    } else {
      const fetchSpot = async () => {
        try {
          const response = await fetch(
            `http://localhost:9000/api/booking/spots`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setSpot(data.spot);
          
        } catch (error) {
          console.error("Error:", error.message);
        }
      };

      fetchSpot();
    }
  }, []);

  if(userid !==""){
    
    return (
      <>
      <div className='parking-container'>
          <div className='grid grid-six column'>
  
          {(() => {
          const carComponents = [];
          for (let index = 0; index < (Spot ? Spot.length : 0); index++) {
            let color;
              if (Spot[index].status === "Available") {
                color = "green";
              } else if (Spot[index].status === "Booked") {
                color = "red";
              } else if (Spot[index].status === "Reserved") {
                color = "grey";
              }
            carComponents.push(<Car key={Spot[index]._id} color={color} />);
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
