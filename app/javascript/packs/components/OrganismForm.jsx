import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label, Modal } from "reactstrap";

function OrganismForm({ user, organisms, setOrganisms, organismId, organismNameToEdit, setOrganismNameToEdit, organismSpeciesToEdit, setOrganismSpeciesToEdit, organismForm, setOrganismForm, modal, setModal }) {
    const [newOrganismName, setNewOrganismName] = useState("");
    const [newOrganismSpecies, setNewOrganismSpecies] = useState("");
    const [newOrganismPhoto, setNewOrganismPhoto] = useState(null);
    // const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const editToggle = () => setOrganismForm(!organismForm);

    function handleNewOrgName(e) {
        setNewOrganismName(e.target.value);
    }

    function handleNewOrgSpecies(e) {
        setNewOrganismSpecies(e.target.value);
    }

    function handleNewOrgPhoto(e) {
        setNewOrganismPhoto(e.target.files[0]);
    }

    function addNewOrganism(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newOrganismName);
        formData.append('species', newOrganismSpecies);
        formData.append('user_id', user.id);
        formData.append('featured_image', newOrganismPhoto);

        fetch("/api/v1/organisms", {
            method: "POST",
            body: formData
        })
            .then(result => result.json())
            .then(() => fetch(`/api/v1/organisms/${user.id}`))
            .then(result => result.json())
            .then(result => setOrganisms(result));

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
            .then(() => fetch(`/api/v1/organisms/${user.id}`))
            .then(result => result.json())
            .then(result => setOrganisms(result));

        e.target.reset();
        setOrganismNameToEdit("");
        setOrganismSpeciesToEdit("");
        setOrganismForm(false);
    }

    return (
        <div>
            {/* <Button onClick={toggle}>Add new plant</Button> */}
            <Modal centered isOpen={modal} toggle={toggle}>
                <Form style={{ backgroundColor: 'rgba(176, 202, 148)', padding: '15px', borderRadius: '.5em'}} onSubmit={addNewOrganism}>
                    <FormGroup>
                        <Label>Plant Name:</Label>
                        <Input onChange={handleNewOrgName} type="text" placeholder="What's your plant's name?"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Species:</Label>
                        <Input onChange={handleNewOrgSpecies} type="text" placeholder="What kind of plant is it?"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Photo:</Label>
                        <Input onChange={handleNewOrgPhoto} type="file" accept="image/*" placeholder="Upload photo here"></Input>
                    </FormGroup>
                    <Button onClick={toggle} type="submit">Add new plant</Button>
                </Form>
            </Modal>
            <Modal centered isOpen={organismForm} toggle={editToggle}>
                <Form style={{ backgroundColor: 'rgba(176, 202, 148)', padding: '15px', borderRadius: '.5em'}} onSubmit={editOrganism}>
                        <FormGroup>
                            <Label>Plant Name:</Label>
                            <Input value={organismNameToEdit} onChange={changeName} type="text" placeholder="Edit plant name"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Species:</Label>
                            <Input value={organismSpeciesToEdit} onChange={changeSpecies} type="text" placeholder="Edit plant species"></Input>
                        </FormGroup>
                        <Button onClick={editToggle} type="submit">Edit</Button>
                    </Form>
            </Modal>
        </div>
    );
}

export default OrganismForm;