import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import backIcon from '../../Assets/Images/backicon.png';
import './styles.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validatePasswords = (newPassword, confirmPassword) => {
    const passwordValidationErrors = [];
    if (newPassword !== confirmPassword) {
      passwordValidationErrors.push("New password and confirm password do not match");
    }
    if (newPassword.length < 8) {
      passwordValidationErrors.push("New password must be at least 8 characters long");
    }
    if (!newPassword.match(/[A-Z]/)) {
      passwordValidationErrors.push("New password must contain at least one uppercase letter");
    }
    if (!newPassword.match(/[a-z]/)) {
      passwordValidationErrors.push("New password must contain at least one lowercase letter");
    }
    if (!newPassword.match(/[0-9]/)) {
      passwordValidationErrors.push("New password must contain at least one digit");
    }
    if (!newPassword.match(/[!@#$%^&*()_+\-=]/)) {
      passwordValidationErrors.push("New password must contain at least one special character");
    }
    return passwordValidationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordValidationErrors = Array.isArray(validatePasswords(newPassword, confirmPassword)) ? validatePasswords(newPassword, confirmPassword) : []; // Validate the passwords

    if (passwordValidationErrors.length > 0) {
      // Display the error alerts
      passwordValidationErrors.forEach((error) => {
        alert(error);
      });

      return;
    }
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('TOKEN');

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    });

    axios.put(`http://localhost:8081/users/password`, { newPassword })
      .then((response) => {
        console.log(response);
        const user = JSON.parse(JSON.stringify(response.data));
        user.password = newPassword;

        // Navigate to the main page
        window.location.href = "/main/students";
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container1">
      <h3>Manage Your Security Settings</h3>
      <div className="backnav">
        <a href="/main/students"> <img className="backimg" src={backIcon} /></a>
        <h3 className="password">Change Your Password</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="changepassword">
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)} />
          </Form.Group>
        </div>
        <Form.Group>
          <ul className="password-instructions">
            <li>Must be at least 8 characters long</li>
            <li>Must contain at least one uppercase letter</li>
            <li>Must contain at least one lowercase letter</li>
            <li>Must contain at least one digit</li>
            <li>Must contain at least one special character</li>
          </ul>
        </Form.Group>
        <Button type="submit">Change Password</Button>
      </Form>
    </div>
  );
};

export default ChangePassword;