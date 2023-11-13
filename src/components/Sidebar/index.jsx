import React from "react";
import "./styles.css"
import diamond from "../../Assets/Images/studenticon.jpg";
import settingicon from "../../Assets/Images/SettingIcon.png";
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <p className="sidebar-title">eSchool</p>
            </div>
            <div className="sidebar-left">
                <div>
                    <img className="studentimg" src={settingicon}/> 
                    <a className="sidebtn" href="/main/settings">Settings</a>
                </div>
                <div>
                    <img className="studentimg" src={diamond}></img>
                    <a className="sidebtn" href="/main/students">Students</a>
                </div>
            </div>
        </div>
    )

}
export default Sidebar;