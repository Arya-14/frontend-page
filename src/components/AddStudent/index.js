import React, { useEffect, useState } from "react";
import axios from "axios";
import backIcon from '../../Assets/Images/backicon.png';
import Userimg from "../../Assets/Images/usericon.png";
import "./styles.css"

const AddStudent = () => {
  const [Firstname, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [Address, setAddress] = useState("");
  const [Class, setClass] = useState("");
  const [ParentsName, setParentsName] = useState("");
  const [Id, setId] = useState("");
  const [Image, setImage] = useState("");
  const [CustomFields, setCustomFields] = useState([]);

  useEffect(() => {
    fetchCustomFields();
  }, []);

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

    const formData = new FormData();
    formData.append("Image", Image);
    formData.append("Firstname", Firstname);
    formData.append("Lastname", Lastname);
    formData.append("Class", Class);
    formData.append("DOB", DOB);
    formData.append("Address", Address);
    formData.append("ParentsName", ParentsName);
    formData.append("Id", Id);
    const formattedCustomFields = CustomFields.map((field) => {
      return {
        Group: field.Group,
        Section: field.Section,
        Label: field.Label,
        Type: field.Type,
        Value: field.Value,
      };
    });
    formData.append("CustomFields", JSON.stringify(formattedCustomFields));

    console.log("Frontend", formData);

    const result = await axios.post("http://localhost:8081/students", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (result.status === 200) {
      alert("New student created successfully");
      window.location.href = "/main/students";
    } else {
      alert("There was an error creating the student. Please try again later.");
    }
  };

  const handleCustomFieldChange = (event) => {
    const { Group, Section, Label, Type, Value } = event.target.dataset;
    const updatedCustomField = {
      Group,
      Section,
      Label,
      Type,
      Value,
    };
  
    const updatedCustomFields = CustomFields.map((field) => {
      if (field.Group === Group && field.Section === Section && field.Label === Label && field.Type === Type) {
        return updatedCustomField;
      }
      return field;
    });
    setCustomFields(updatedCustomFields);
  };

  const onInputChange = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
    document.getElementById("preview").src = imageURL;
  };

  return (
    <div className="add-student-form">
      <div className="backnav1">

        <a href="/main/students"> <img className="backimg" src={backIcon} /></a>
        <h1>Add New Student</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <img id="preview" src={Userimg} alt="Preview image" />
        <input className="imgupload" type="file" accept="image/*" onChange={onInputChange}></input>
        <div className="flex-row">
          <input className="textbox" type="text"
            name="First Name"
            placeholder="First Name"
            value={Firstname}
            onChange={(event) => setFirstName(event.target.value)} />
          <input className="textbox" type="text"
            name="Last Name"
            placeholder="Last Name"
            value={Lastname}
            onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div className="flex-row">
          <input className="textbox" type="number"
            name="ID"
            placeholder="ID"
            value={Id}
            onChange={(event) => setId(event.target.value)} />
          <input className="textbox" type="date"
            name="Date Of Birth"
            placeholder="Date Of Birth"
            value={DOB}
            onChange={(event) => setDOB(event.target.value)} />
        </div>
        <div className="flex-row">
          <input className="textbox" type="text"
            name="Class"
            placeholder="Class"
            value={Class}
            onChange={(event) => setClass(event.target.value)} />
          <input className="textbox" type="text"
            name="Parent's Name"
            placeholder="Parent's Name"
            value={ParentsName}
            onChange={(event) => setParentsName(event.target.value)} />
        </div>
        <div className="flex-row2">
          <input className="textbox" type="text"
            name="Address"
            placeholder="Address"
            value={Address}
            onChange={(event) => setAddress(event.target.value)} />
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
        <div className="left">
          <button className="submitbtn" type="submit">Add Student</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;