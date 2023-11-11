import React, { useState } from "react";
import axios from "axios";
import "./styles.css"

const AddStudent = () => {
  const [Firstname, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [Address, setAddress] = useState("");
  const [Class, setClass] = useState("");
  const [ParentsName, setParentsName]= useState("");
  const [Id, setId] =useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:8081/students', { Firstname,Lastname,Class, DOB, Address, ParentsName, Id });

    if (response.status === 201) {
      alert('New student created successfully');
      window.location.href = '/main/students';
    } else {
      alert('There was an error creating the student. Please try again later.');
    }
  };

  return (
    <div className="add-student-form">
      <h1>Add New Student</h1>

      <form onSubmit={handleSubmit}>
      <div className="flex-row">
        <input type="text"
               name="First Name"
               placeholder="First Name"
               value={Firstname}
               onChange={(event) => setFirstName(event.target.value)} />
        <input type="text"
               name="Last Name"
               placeholder="Last Name"
               value={Lastname}
               onChange={(event) => setLastName(event.target.value)} />
      </div>
      <div className="flex-row">
        <input type="number"
               name="ID"
               placeholder="ID"
               value={Id}
               onChange={(event) => setId(event.target.value)} />
        <input type="date"
               name="Date Of Birth"
               placeholder="Date Of Birth"
               value={DOB}
               onChange={(event) => setDOB(event.target.value)} /> 
      </div>
      <div className="flex-row">             
        <input className="section" type="text"
               name="Class"
               placeholder="Class"
               value={Class}
               onChange={(event) => setClass(event.target.value)} />
        <input type="text"
               name="Parent's Name"
               placeholder="Parent's Name"
               value={ParentsName}
               onChange={(event) => setParentsName(event.target.value)} />
      </div>
      <div className="flex-row2">
        <input type="text"
               name="Address"
               placeholder="Address"
               value={Address}
               onChange={(event) => setAddress(event.target.value)}/>
      </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;