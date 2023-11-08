import React from "react";
import './App.css';
// import ProtectedRoutes from "./components/ProtectedRoutes";
import { Navigate, Route, Routes,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChangePassword from "./components/Password";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function App() {
  const token = cookies.get("Token");
  return (
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
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
