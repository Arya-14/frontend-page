import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./styles.css";
function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const segments = pathname.split('/');
    const resource = segments[segments.length - 1];
    return (
        <div className="upNavbar">
            <p className="path"> {resource} </p>
            <div className="nav-dropdown">

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
                        <i className="bi bi-three-dots-vertical"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Link to="/main/profile" className="dropdown-item">Profile</Link>
                        <Link to="/main/change-password" className="dropdown-item">Change Password</Link>
                        <Link to="/main/logout" className="dropdown-item">Log Out</Link>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
export default Navbar;