import React, { useState } from "react";
import './App.css';
import { Navigate, Route, Routes,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChangePassword from "./components/Password";
import Logout from "./components/Logout";
import StudentsPage from "./components/StudentPage";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudentDetail";
import SettingsPage from "./components/Settings";
import Layout from "./components/Layout";
import EditCustomField from "./components/EditCustomField";
import AddStudentCustomField from "./components/AddCustomDetails";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user }}>
    <div>
      <Routes> 
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<Layout/>}>
          <Route path="/main/change-password" element={<ChangePassword/>}/>
          <Route path="/main/logout" element={<Logout/>}/>
          <Route path="/main/students" element={<StudentsPage/>}/>
          <Route path="/main/add-student" element={<AddStudent/>}/>
          <Route path="/main/Edit-studentDetails" element={<EditStudent/>} />
          <Route path="/main/edit-student-customFields" element={<EditCustomField/>}/>
          <Route path="/main/add-student-customFields" element={<AddStudentCustomField/>}/>
          <Route path="/main/settings" element={<SettingsPage/>}/>
        </Route>
      </Routes>
      </div>
      </UserContext.Provider> 
  );
}

export default App;
