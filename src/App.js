import React from "react";
import './App.css';
// import ProtectedRoutes from "./components/ProtectedRoutes";
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
import Cookies from "universal-cookie";
const cookies = new Cookies();
function App() {
  const token = cookies.get("Token");
  return (
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<Layout/>}>
          {/* <Route path="/main" element={<Main/>}/> */}
          <Route path="/main/change-password" element={<ChangePassword/>}/>
          <Route path="/main/logout" element={<Logout/>}/>
          <Route path="/main/students" element={<StudentsPage/>}/>
          <Route path="/main/add-student" element={<AddStudent/>}/>
          <Route path="/main/Edit-studentDetails" element={<EditStudent/>} />
          <Route path="/main/edit-student-customFields" element={<EditCustomField/>}/>
          <Route path="/main/add-student-customFields" element={<AddStudentCustomField/>}/>
          <Route path="/main/settings" element={<SettingsPage/>}/>
        </Route>
        {/* <Route path="/main" render={() => {
        if (token) {
          return <Main />;
        } else {
          return <Navigate to="/login" />;
        }
        }} /> */}
      </Routes>
  );
}

//  function App() {
//   const student = localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       <div>
//         {student ? (
//           <Routes>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<Main />} />
//           </Routes>
//         ) : (
//           <Navigate to="/login" />
//         )}
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;
