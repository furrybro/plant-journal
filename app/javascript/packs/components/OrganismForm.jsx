import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function OrganismForm({ user, organisms, setOrganisms }) {
    const [ newOrganismName, setNewOrganismName ] = useState("");
    const [ newOrganismSpecies, setNewOrganismSpecies ] = useState(""); 

    function handleNewOrgName(e) {
        setNewOrganismName(e.target.value);
    }

    function handleNewOrgSpecies(e) {
        setNewOrganismSpecies(e.target.value);
    }

    function addNewOrganism(e) {
        e.preventDefault();
        
        let newOrganismObj = {
            name: newOrganismName,
            species: newOrganismSpecies,
            user_id: user.id,
        }

        fetch("/api/v1/organisms", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newOrganismObj)
        })
        .then(result => result.json())
        .then(result => setOrganisms([...organisms, result]));

        e.target.reset();
    }

    return (
        <Form onSubmit={addNewOrganism}>
            <Form.Field>
                <label>Plant Name:</label>
                <Form.Input onChange={handleNewOrgName} type="text" placeholder="What's your plant's name?"></Form.Input>
            </Form.Field>
            <Form.Field>
                <label>Species:</label>
                <Form.Input onChange={handleNewOrgSpecies} type="text" placeholder="What kind of plant is it?"></Form.Input>
            </Form.Field>
            <Button type="submit">Add new plant!</Button>
        </Form>
    );
}

export default OrganismForm;