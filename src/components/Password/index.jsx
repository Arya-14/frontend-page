import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validatePasswords = (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      return "New password and confirm password do not match";
    }
    if (newPassword.length < 8) {
      return "New password must be at least 8 characters long";
    }
    if (!newPassword.match(/[A-Z]/)) {
      return "New password must contain at least one uppercase letter";
    }
    if (!newPassword.match(/[a-z]/)) {
      return "New password must contain at least one lowercase letter";
    }
    if (!newPassword.match(/[0-9]/)) {
      return "New password must contain at least one digit";
    }
    if (!newPassword.match(/[!@#$%^&*()_+\-=]/)) {
      return "New password must contain at least one special character";
    }
    return null;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const passwordValidationErrors = Array.isArray(validatePasswords(newPassword, confirmPassword)) ? validatePasswords(newPassword, confirmPassword) : []; // Validate the passwords
    if (passwordValidationErrors. length >0) {
        // const newPasswordError = passwordValidationErrors.find((error) => error.startsWith("New password"));
        // const confirmPasswordError = passwordValidationErrors.find((error) => error.startsWith("Confirm password"));
        // if (newPasswordError) {
        //   document.querySelector("#newPasswordError").textContent = newPasswordError;
        // }
        // if (confirmPasswordError) {
        //   document.querySelector("#confirmPasswordError").textContent = confirmPasswordError;
        // }
        return;
      }
      const response = await axios.put("http://localhost:8081/students/:id/password", {
        newPassword,
        URL: "http://localhost:8081/students/:id/password",
      });
      if(response.status === 200){
        console.log('Success')
      }else {
        console.log(Error);
      }
      const student = JSON.parse(response.data);
      student.password= newPassword;
      await student.save();
      window.location.href = `/students/${student.id}`;
  };

  return (
    <div className="container">
      <h1>Manage Your Security Settings</h1>
      <h2>Change Your Password</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <ul className="password-instructions">
          <li>Must be at least 8 characters long</li>
          <li>Must contain at least one uppercase letter</li>
          <li>Must contain at least one lowercase letter</li>
          <li>Must contain at least one digit</li>
          <li>Must contain at least one special character</li>
        </ul>

        <Button type="submit">Change Password</Button>
        <a href="/main">Back</a>
      </Form>
    </div>
  );
};

export default ChangePassword;