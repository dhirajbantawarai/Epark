import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:9000/api/user/all/')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleGoBack = () => {
    setLoading(true); // Set loading to true when navigating back
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>All Users</h2>

      {loading ? (
        <p>
          Loading <FontAwesomeIcon icon={faSpinner} spin />
        </p>
      ) : (
        <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '70%', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Username</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid #dddddd' }}>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{user._id}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{user.username}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br></br>
      <br></br>
      {loading ? (
        <p>
          Loading <FontAwesomeIcon icon={faSpinner} spin />
        </p>
      ) : (
        <NavLink to="/admin">
          <button onClick={handleGoBack}>Go back</button>
        </NavLink>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
