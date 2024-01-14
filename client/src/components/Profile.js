import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/StoreContext";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  
  const [isEditMode, setEditMode] = useState(false);
  const { userid } = useProductContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userid === "" || userid === null) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:9000/api/user/${userid}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserData(data.user);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };

      fetchData();
    }
  }, []);
  const handlecancel =()=>{
    setEditMode(false);
  }

  const handlesave =async()=>{

    try {
      const response = await fetch(`http://localhost:9000/api/user/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Profile Updated");
        const fetchUserDetails = async () => {
          try {
            const response = await fetch(`http://localhost:9000/api/user/${userid}`);
            const data = await response.json();
            setUserData(data.user);
          } catch (error) {
            alert('Error fetching user details:'+error);
            // Handle error (show alert, redirect, etc.)
          }
        };
        // For example, you might want to fetch the updated user details again
        fetchUserDetails();
        // After saving changes, exit edit mode
        setEditMode(false);
      } else if (!response.ok) {
        const responseData = await response.json();
        
        // Display the error message in an alert
        alert('Cannot update: ' + responseData.message);
      }
    } catch (error) {
      alert('Error updating user details:'+error);
      // Handle other types of errors (e.g., network issues)
      // You might want to show an alert or perform other error handling here
    }

    
    setEditMode(false);
  }
  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }));
  };

  const renderTable = () => {
    if (!userData) {
      return <p>Loading...</p>;
    }
    

    const { _id, email, phone, username, answer, question } = userData;

    return (
      <>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Security Answer</th>
              <th>Security Question</th>
            </tr>
          </thead>
          <tbody>
            {
              isEditMode===false?(

            <tr>
              <td>{_id}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{answer}</td><td>{question}</td>
          
                <button onClick={() => handleEdit(_id)}>Edit</button>
              
            </tr>
              ):
              (
                <tr>
                {
                  Object.entries(userData).map(([key,value]) => (
                  <td>
                  {
                    key==="_id" || key ==="question"? <span>{value}</span>:(
                    <input type="text" name={key} value={userData[key] !== undefined ? userData[key] : value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    />)
                  }

                  </td>

                  ))
                }
                
                  <button onClick={()=>handlesave()}>Save</button>
                  <br></br><br></br>
                  <button onClick={()=>handlecancel()}>Cancel</button>
             
              </tr>
                

              )
            }
          </tbody>
        </table>
      </div>
      </>
    );
  };

  const handleEdit = (userId) => {
    // Implement your edit logic here, e.g., navigate to an edit page
    setEditMode(true);
  };

  return (
    <div>
      <h2 style={{ marginTop: "20px" }}>User Profile</h2>
      {renderTable()}
    </div>
  );
};
