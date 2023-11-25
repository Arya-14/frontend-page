import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import backIcon from '../../Assets/Images/backicon.png';
import "./styles.css";

const EditStudent = ({ match }) => {
  const [student, setStudent] = useState({});
  const [CustomFields, setCustomFields] = useState([]);

  const location = useLocation()
  console.log(location);
  const { from } = location.state;
  console.log(location.state)
  console.log("from", from)

  useEffect(() => {
    setStudent(from)
    fetchCustomFields();
  }, [from]);

  const fetchCustomFields = async () => {
    const response = await axios.get("http://localhost:8081/customFields");
    const structuredCustomFields = convertToStructuredData(response.data);
    setCustomFields(structuredCustomFields);
  };

  const convertToStructuredData = (customFieldsData) => {
    const groupedCustomFields = [];
    const groupMap = {};

    for (const customField of customFieldsData) {
      const groupName = customField.Group;

      if (!groupMap[groupName]) {
        groupMap[groupName] = {
          Group: groupName,
          sections: [],
        };
        groupedCustomFields.push(groupMap[groupName]);
      }

      const groupObject = groupMap[groupName];
      const sectionName = customField.Section;

      let matchingSection = groupObject.sections.find((section) => section.Label === sectionName);
      if (!matchingSection) {
        matchingSection = {
          Label: sectionName,
          fields: [],
        };
        groupObject.sections.push(matchingSection);
      }

      matchingSection.fields.push(customField);
    }
    return groupedCustomFields;
  };

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
  const handleCustomFieldChange = (event) => {
    const { Group, Section, Label, Type, Value } = event.target.dataset;
    const updatedCustomFields = CustomFields.map((field) => {
      if (field.Group === Group && field.Section === Section && field.Label === Label && field.Type === Type) {
        return { ...field, Value };
      }
      return field;
    });
    setCustomFields(updatedCustomFields);
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
        {CustomFields.length > 0 && (
          <div className="custom-fields">
            {CustomFields.map((groupData, groupIndex) => (
              <div className="group-wrapper" key={groupIndex}>
                <div className="group-rectangle">
                  <div className="group-header">{groupData.Group}</div>
                </div>
                <div className="section-wrapper">
                {groupData.sections.map((sectionData, sectionIndex) => (
                  <div className="section-rectangle" key={sectionIndex}>
                    <div className="section-header">{sectionData.Label}</div>
                    {sectionData.fields.map((field) => (
                      <div className="field-wrapper" key={`${field.Group}-${field.Section}-${field.Label}`}>
                        <label className="label1">{field.Label}</label>
                        <input
                          className="textbox1"
                          type="text"
                          placeholder={` ${field.Type}`}
                          data-group={field.Group}
                          data-section={field.Section}
                          data-label={field.Label}
                          value={field.Value}
                          onChange={handleCustomFieldChange}
                        />
                      </div>
                    ))}
                  </div>
                ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="right">
        <button className="subbtn" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;