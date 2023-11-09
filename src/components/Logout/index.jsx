import React from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Logout = () => {
  useEffect(() => {
    // Remove the token from the cookie
    cookies.remove("TOKEN");
    alert("Are you sure you want to log out?");
    // Redirect to the login page
    window.location.href ="/login";
  }, []);

  return <div>Logged out successfully!</div>;
};

export default Logout