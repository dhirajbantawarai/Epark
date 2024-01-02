import React from 'react'
import { Car } from './Car'
import "../styles/parking.css";

export const Parking = () => {
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
}
