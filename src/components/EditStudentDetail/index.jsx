import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import backIcon from '../../Assets/Images/backicon.png';
import "./styles.css";

const EditStudent = ({ match }) => {
  const [student, setStudent] = useState({});


  const location = useLocation()
  const { from } = location.state;
  console.log("from", from)

  useEffect(() => {
    setStudent(from)
  }, [from]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.put(`http://localhost:8081/students/${student._id}`, student);

    if (response.status === 200) {
      // The student was updated successfully
      window.location.href = '/main/students';
    } else {
      // There was an error updating the student
      alert('There was an error updating the student. Please try again later.');
    }
  };

  return (
    <div className="edit-student-form">
    <div className="flexbox2">
      <a href="/main/students"> <img className="backimg" src={backIcon} /></a>
      <h1>Edit Student Details</h1>
    </div>

      <form onSubmit={handleSubmit}>
        <div className="flex-row">
          <input className="textcol" type="text" name="First Name" placeholder="First Name" value={student.Firstname} onChange={(event) => setStudent({ ...student, Firstname: event.target.value })} />
          <input className="textcol" type="text" name="Last Name" placeholder="Last Name" value={student.Lastname} onChange={(event) => setStudent({ ...student, Lastname: event.target.value })} />
        </div>
        <div className="flex-row">
          <input className="textcol" type="date" name="Date of birth" placeholder="Date of Birth" value={student.DOB} onChange={(event) => setStudent({ ...student, DOB: event.target.value })} />
          <input className="textcol" type="text" name="Parent's Name" placeholder="Parent's Name" value={student.ParentsName} onChange={(event) => setStudent({ ...student, ParentsName: event.target.value })} />
        </div>
        <div className="flex-row">
          <input className="textcol" type="number" name="Id" placeholder="ID" value={student.Id} onChange={(event) => setStudent({ ...student, Id: event.target.value })} />
          <input className="textcol" type="text" name="Class" placeholder="Class" value={student.Class} onChange={(event) => setStudent({ ...student, Class: event.target.value })} />
        </div>
        <div className="flex-row2">
          <input className="textcol" type="text" name="Address" placeholder="Address" value={student.Address} onChange={(event) => setStudent({ ...student, Address: event.target.value })} />
        </div>
        <div className="right">
        <button className="subbtn" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;