import React from 'react';
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Remove the token from the localstorage
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("NAME");
    alert("Are you sure you want to log out?");
    // Redirect to the login page
    window.location.href ="/login";
  }, []);

  return <div>Logged out successfully!</div>;
};

export default Logout