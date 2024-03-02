import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Replace the URL with your actual API endpoint
    fetch('http://localhost:9000/api/booking/')
      .then(response => response.json())
      .then(data => {
        const formattedBookings = data.bookings.map(booking => ({
          ...booking,
          startDate: new Date(booking.startDate).toLocaleDateString(),
        }));
        setBookings(formattedBookings);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const formatTime = (dateString, timeString) => {
    const dateTimeString = `${dateString}T${timeString}`;
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>All Bookings</h2>
      <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '70%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Vehicle Number</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Start Date</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Start Time</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>End Time</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Spot ID</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id} style={{ borderBottom: '1px solid #dddddd' }}>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking._id}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.name}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.vehicleNumber}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.startDate}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.startTime}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.endTime}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.spotid}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{booking.totalprice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <NavLink to='/admin'>
        <button>Go Back</button>
      </NavLink>
      <br></br>
      <br>
      </br>
      <br></br>
    </div>
  );
};

