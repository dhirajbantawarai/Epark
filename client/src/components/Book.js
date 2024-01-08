import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/book.css";
import { useProductContext } from "../context/StoreContext";


const Book = () => {

    //api end point localhost:9000/api/booking/
    const {user } = useProductContext();
    const navigate = useNavigate(); // Initialize useNavigate
    useEffect(()=>{

        if(user===""){
            navigate('/login');
        }
    },[])
  const [name, setName] = useState(user);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
  
    // Format month and day to have leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${year}-${month}-${day}`;
  };
  
  const getNextDate = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
  
    const year = nextDate.getFullYear();
    let month = nextDate.getMonth() + 1;
    let day = nextDate.getDate();
  
    // Format month and day to have leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${year}-${month}-${day}`;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Construct the request body
        const requestBody = JSON.stringify({
          name,
          vehicleNumber,
          startDate,
          startTime,
          endTime,
        });
  
        // Make the POST request to your API
        const response = await fetch('http://localhost:9000/api/booking/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Handle the response if needed
        const responseData = await response.json();
        alert(''+responseData.message);
        navigate('/parking')
  
        // Reset the form after successful submission
        setName('');
        setVehicleNumber('');
        setStartDate('');
        setStartTime('');
        setEndTime('');
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error as needed
      }
  };
  console.log(user);

  return (
    <>
 <div className="book-page">
      <div className="bookbox">
      <h2>Parking Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <br/>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Vehicle Number:
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={getCurrentDate()}
            max={getNextDate()}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <br/>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Book;
