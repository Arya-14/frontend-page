import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import backIcon from '../../Assets/Images/backicon.png';
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const EditCustomField = (props) => {
    const [customField, setCustomField] = useState([]);
    const location = useLocation()
  const { from } = location.state;
  console.log("from", from)

    useEffect(() => {
        setCustomField(from);
    }, [from]);

    const handleUpdateCustomField = async (e) => {
        e.preventDefault();

        const updatedCustomField = {
            Label: e.target.label.value,
            Type: e.target.type.value,
        };

        await axios.put(`http://localhost:8081/customFields/${customField._id}`, updatedCustomField);

        // Redirect to the custom main fields page
        window.location.href='/main/settings';
        
    };

    return (
        <div className="customfield">
        <div className="displayflex">
          <a href="/main/settings"> <img className="backimg" src={backIcon} /></a>
            <h2 className="my-3">Edit Student Custom Fields</h2>
        </div>

            <Form onSubmit={handleUpdateCustomField}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Label</InputGroup.Text>
                    <FormControl
                        type="text"
                        name="label"
                        defaultValue={customField.Label}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Type</InputGroup.Text>
                    <FormControl
                        type="text"
                        name="type"
                        defaultValue={customField.Type}
                    />
                </InputGroup>
                <div className="right">
                <Button type="submit" className="btn btn-primary">
                    Update
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default EditCustomField;