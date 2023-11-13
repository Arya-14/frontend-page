import React, { useState } from "react";
import axios from "axios";
import backIcon from '../../Assets/Images/backicon.png';

import "./styles.css"

const AddStudentCustomField = () => {
  const [Group, setGroup] = useState("");
  const [Label, setLabel] = useState("");
  const [Section, setSection] = useState("");
  const [Type, setType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:8081/customFields', { Group, Label, Section, Type });

    if (response.status === 201) {
      alert('New student custom field created successfully');
      window.location.href = '/main/settings';
    } else {
      alert('There was an error creating the custom fields. Please try again later.');
    }
  };

  return (
    <div className="add-student-form">
    <div className="addcustom">
          <a href="/main/settings"> <img className="backimg" src={backIcon} /></a>

      <h1>Add New Student'S Custom Field</h1>
      </div>

      <form onSubmit={handleSubmit}>
      <div className="addcustomdetails">
        <input type="text"
               name="Group"
               placeholder="Group"
               value={Group}
               onChange={(event) => setGroup(event.target.value)} />
        <input type="text"
               name="Label"
               placeholder="Label"
               value={Label}
               onChange={(event) => setLabel(event.target.value)} />
        <input type="text"
               name="Section"
               placeholder="Section"
               value={Section}
               onChange={(event) => setSection(event.target.value)} />
        <input type="text"
               name="Type"
               placeholder="Type"
               value={Type}
               onChange={(event) => setType(event.target.value)} />
        </div>

        <button className="addbtn" type="submit">Add Custom Fields</button>
      </form>
    </div>
  );
};

export default AddStudentCustomField;