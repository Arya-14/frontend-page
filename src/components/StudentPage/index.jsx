import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../Main'; // Import the Main component
import './styles.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios.get('/api/students')
//       .then(response => {
//         setStudents(response.data);
//       });
//   }, []);

  return (
    <div className="students-page">
      <Main /> <div className="student-content">
        <input class='search_btn' type="text" placeholder="Search students..." />
        <button class='edit'><Link to={'/edit-student/${student.id}'}> Edit Student Details </Link></button>
        <button class='add_new'><Link to="/add-student">+ Add New</Link></button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              {/* <th>Date of Birth</th> */}
              <th>Class</th>
              <th>Parent's Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>

          
</thead>


          
<tbody>
            {students.map(student => (
              <tr
 
key={student.id}>

                
<td>{student.id}</td>

                
<td>{student.firstName}</td>

                
<td>{student.lastName}</td>

                
<td>{student.email}</td>
                {/* <td>{student.dateOfBirth}</td> */}

                <td>{student.class}</td>

                
<td>{student.parentsName}</td>
                <td>{student.address}</td>
                <td>
                  <Link to={`/edit-student/${student.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default StudentsPage;