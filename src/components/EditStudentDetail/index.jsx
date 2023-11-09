import React, { useState, useEffect } from "react";
import axios from "axios";

const EditStudent = ({  }) => {
  const [student, setStudent] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const response = await axios.put(`/students/${match.params.id}`, student);

    // if (response.status === 200) {
    //   // The student was updated successfully
    //   window.location.href = '/students';
    // } else {
    //   // There was an error updating the student
    //   alert('There was an error updating the student. Please try again later.');
    // }
  };

  useEffect(() =>{})
//     axios.get(`/students/${match.params.id}`)
//       .then(response => {
//         setStudent(response.data);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }, [match.params.id]);

  return (
    <div className="edit-student-form">
      <h1>Edit Student Details</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="First Name" placeholder="First Name" value={student.Firstname} onChange={(event) => setStudent({ ...student, Firstname: event.target.value })} />
        <input type="text" name="Last Name" placeholder="Last Name" value={student.Lastname} onChange={(event) => setStudent({ ...student, Lastname: event.target.value })} />
        <input type="text" name="Address" placeholder="Address" value={student.Address} onChange={(event) => setStudent({ ...student, Address: event.target.value })} />
        <input type="text" name="Parent's Name" placeholder="Parent's Name" value={student.Parentsname} onChange={(event) => setStudent({ ...student, ParentsName: event.target.value })} />
        <input type="number" name="Id" placeholder="ID" value={student.Id} onChange={(event) => setStudent({ ...student, Id: event.target.value })} />
        <input type="text" name="Class" placeholder="Class" value={student.Class} onChange={(event) => setStudent({ ...student, Class: event.target.value })} />
        <input type="date" name="Date of birth" placeholder="Date of Birth" value={student.DOB} onChange={(event) => setStudent({ ...student, DOB: event.target.value })} />
        <textarea name="joining_info" placeholder="Joining Info" value={student.joining_info} onChange={(event) => setStudent({ ...student, joining_info: event.target.value })} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditStudent;