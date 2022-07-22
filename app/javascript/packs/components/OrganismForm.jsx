import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";

function OrganismForm({ user, organisms, setOrganisms, organismId, organismNameToEdit, setOrganismNameToEdit, organismSpeciesToEdit, setOrganismSpeciesToEdit }) {
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

    function changeName(e) {
        let editName = e.target.value;
        setOrganismNameToEdit(editName);
    }

    function changeSpecies(e) {
        let editSpecies = e.target.value;
        setOrganismSpeciesToEdit(editSpecies);
    }

    function editOrganism(e) {
        e.preventDefault();
        let editOrgObj = {
            name: organismNameToEdit,
            species: organismSpeciesToEdit,
            user_id: user.id
        };

        fetch(`/api/v1/organisms/${organismId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(editOrgObj)
        })
        .then(result => result.json())
        .then(() => fetch("/api/v1/organisms"))
        .then(result => result.json())
        .then(result => setOrganisms(result));

        e.target.reset();
        setOrganismNameToEdit("");
        setOrganismSpeciesToEdit("");
    }

    return (
        <React.Fragment>
            <Form onSubmit={addNewOrganism}>
                <FormGroup>
                    <Label>Plant Name:</Label>
                    <Input onChange={handleNewOrgName} type="text" placeholder="What's your plant's name?"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Species:</Label>
                    <Input onChange={handleNewOrgSpecies} type="text" placeholder="What kind of plant is it?"></Input>
                </FormGroup>
                <Button type="submit">Add new plant</Button>
            </Form>
            <Form onSubmit={editOrganism}>
                <FormGroup>
                    <Label>Plant Name:</Label>
                    <Input value={organismNameToEdit} onChange={changeName} type="text" placeholder="Edit plant name"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Species:</Label>
                    <Input value={organismSpeciesToEdit} onChange={changeSpecies} type="text" placeholder="Edit plant species"></Input>
                </FormGroup>
                <Button type="submit">Edit your plant</Button>
            </Form>
        </React.Fragment>

    );
}

export default OrganismForm;