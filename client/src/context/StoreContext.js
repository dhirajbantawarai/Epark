import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/StoreReducer';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  user: '',
  userid: '',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const getcookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const username = getcookie('username');
    const userid = getcookie('userid');

    if (username && userid) {
      dispatch({
        type: 'SET_USER',
        payload: {
          username: username,
          userid: userid,
        },
      });
    }
  }, []);

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: { username: '', userid: '' } });
    removeCookie('username');
    removeCookie('userid');
    navigate('/'); // Navigate to the desired route after logout
  };

  const handleLoginSuccess = (userData) => {
    const username = userData.username;
    const userid = userData.userid;
    dispatch({
      type: 'SET_USER',
      payload: {
        username: username,
        userid: userid,
      },
    });
    navigate('/parking'); // Navigate to the desired route after login
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
        const errorData = await response.json();
        window.alert('Login failed: ' + errorData.message);
        return;
      }

      const userData = await response.json();
      if (userData) {
        handleLoginSuccess(userData);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        const expiresUTC = expirationDate.toUTCString();
        const username = userData.username;
        const userid = userData.userid;
        document.cookie = `username=${username}; expires=${expiresUTC}; path=/`;
        document.cookie = `userid=${userid}; expires=${expiresUTC}; path=/`;
      } else {
        window.alert('Server error: Try again Later');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Error during login:', error.message);
    }
  };

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
