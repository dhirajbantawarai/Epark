import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/StoreReducer";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  user: "",
  userid:""
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate(); // Initialize useNavigate
  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    // try {
    //   const res = await axios.get(url);
    //   const products = await res.data;
    //   dispatch({ type: "SET_API_DATA", payload: products });
    // } catch (error) {
    //   dispatch({ type: "API_ERROR" });
    // }
  };

  // my 2nd api call for single product

  const logout = () => {
    dispatch({ type: "SET_USER", payload: { username: "", userid: "" } });
    navigate('/');
  };
  const handleLoginSuccess = (userData) => {
    const username = userData.username;
    const userid = userData.userid;
    dispatch({ type: "SET_USER", payload: {
        username:username,userid:userid
    } });
    navigate('/parking');
  };

 

  const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:9000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Handle non-successful responses
        const errorData = await response.json();
        window.alert('Login failed: ' + errorData.message);
        return;
      }

      const userData = await response.json();
      if (userData) {
        // Update the user and userid in the state upon successful login
        handleLoginSuccess(userData);
        //window.location.href = 'http://localhost:3000/parking';
      } else {
        window.alert('Server error: Try again Later');
      }

    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

//   useEffect(() => {
//     getProducts(API);
//   }, []);



  return (
    <AppContext.Provider value={{ ...state, loginUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };