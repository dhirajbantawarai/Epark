
import React, { useState } from "react";
import "../styles/forgot.css";
import {useNavigate} from "react-router-dom";


export const Forgot = () => {
  const [username, setUsername] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setpassword] = useState("");
  const [id, setid]= useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`http://localhost:9000/api/user/mail/${username}`);
      const data = await response.json();
      if(response.status===404){
          alert(data.message)
      }
      if(response.status===200){
        setid(data.user._id);
        setquestion(data.user.question);
      }
    }catch(err){
      alert(err);
    }
  };
  const handleAnswer = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch(`http://localhost:9000/api/user/answer/${id}`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({answer,password})
      })
      const data = await response.json();
      alert(data.message);
      if(response.status === 200){

        navigate("/login");
      }
    }catch(err){
      alert(err);
    }
  }
  return (
    <>
    <div className="que-box">
          <form className="que-form">
            <div >
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {
              question !==""?(

              <div>
                <label htmlFor="securityQuestion">Security Question:</label>
                <p>{question}?</p>
                <div>
                  <label htmlFor="answer">Answer:</label>
                  <input
                    type="text"
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Answer:</label>
                  <input
                    type="text"
                    id="answer"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                <button type="submit" onClick={(e)=>handleAnswer(e)}>Submit</button>
                </div>
              </div>
              ):(
                <div>
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
              </div>
              )
            }






          </form>
    </div>
    </>
  );
};
