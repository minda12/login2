import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';




const AuthContext = React.createContext({
  isLoggedin: false,
  token: '',
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {

  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const history = useHistory()

  const isLoggedin = !!token;

  const UsrLoggedIn = (token) => {
    setToken(token);
    console.log("Loggedin Token", token);

    localStorage.setItem('token', token);


      setTimeout(() => {
        localStorage.removeItem('token');
        alert("Session Epired Login Again")
         history.replace('/auth')
         usrLoggedOut()
      }, 300000);


  };

  const usrLoggedOut = () => {
    setToken(null);
    console.log("Logged out");
    localStorage.removeItem('token');
  };

  const contextValue = {
    token: token,
    isLoggedin: isLoggedin,
    Loggedin: UsrLoggedIn,
    Loggedout: usrLoggedOut,
  };

  console.log('contextValue', contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
