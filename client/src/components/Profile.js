import React, { useState, useEffect } from 'react';
import '../styles/profile.css'; 
import {useNavigate} from "react-router-dom";
import { useProductContext } from "../context/StoreContext";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { userid } = useProductContext();
  const navigate = useNavigate();



  useEffect(() => {
    if(userid === "" || userid === null){
        navigate('/');
      }
      else{
        
          const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:9000/api/user/${userid}`);
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
              const data = await response.json();
              setUserData(data.user);
            } catch (error) {
              console.error('Error:', error.message);
            }
          };
      
          fetchData();
      }
  }, []);

  const renderTable = () => {
    if (!userData) {
      return <p>Loading...</p>;
    }

    const { _id, age, email, phone, username, 'veh-no': vehNo } = userData;

    return (
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{_id}</td>
              <td>{age}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{username}</td>
              <td>
                <button onClick={() => handleEdit(_id)}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const handleEdit = (userId) => {
    // Implement your edit logic here, e.g., navigate to an edit page
    console.log(`Editing user with ID: ${userId}`);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {renderTable()}
    </div>
  );
};
