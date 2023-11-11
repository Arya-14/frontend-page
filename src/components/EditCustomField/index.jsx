import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const EditCustomField = (props) => {
    const [customField, setCustomField] = useState([]);

    // useEffect(() => {
    //     axios.get(`/customFields/${match.params.id}`)
    //         .then(response => {
    //             setCustomField(response.data);
    //         });
    // }, [match.params.id]);

    const handleUpdateCustomField = async (e) => {
        e.preventDefault();

        // const updatedCustomField = {
        //     label: e.target.label.value,
        //     type: e.target.type.value,
        // };

        // await axios.put(`/customFields/${match.params.id}`, updatedCustomField);

        // Redirect to the custom fields page
    };

    return (
        <div className="customfield">
            <Link to={"/main/settings"}> Back </Link>
            <h1 className="my-3">Edit Student Custom Fields</h1>

            <Form onSubmit={handleUpdateCustomField}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Label</InputGroup.Text>
                    <FormControl
                        type="text"
                        name="label"
                        defaultValue={customField.label}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Type</InputGroup.Text>
                    <FormControl
                        type="text"
                        name="type"
                        defaultValue={customField.type}
                    />
                </InputGroup>

                <Button type="submit" className="btn btn-primary">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default EditCustomField;