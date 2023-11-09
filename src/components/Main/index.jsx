import React, { useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './styles.css'

const Main = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">eSchool</h2>
        </div>
        <Nav className="sidebar-nav">
          <Nav.Link href="/main/settings">Settings</Nav.Link>
          <Nav.Link href="/main/students">Students</Nav.Link>
        </Nav>
      </div>

      <div className="Navbar">
      <Nav>
         {/* Other Nav items go here */}
        <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
        <i className="bi bi-three-dots-vertical"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Link to="/profile" className="dropdown-item">Profile</Link>
        <Link to="/change-password" className="dropdown-item">Change Password</Link>
        <Link to="/logout" className="dropdown-item">Log Out</Link>
         </Dropdown.Menu>
        </Dropdown>
      </Nav>

        {/* The rest of your main page content goes here */}
      </div>

      <div className="setting-page">
        {/* The setting page content goes here */}
      </div>
    </div>
  );
};

export default Main;