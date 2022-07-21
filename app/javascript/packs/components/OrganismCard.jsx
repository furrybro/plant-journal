import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";

function OrganismCard({ name, species, organismId, setOrganismId, organisms, setOrganisms, setOrganismNameToEdit, setOrganismSpeciesToEdit }) {

    function handleEntryClick(e) {
        setOrganismId(e.target.value);
    }

    function handleDeleteOrganism(e) {
        fetch(`/api/v1/organisms/${e.target.value}`, {
            method: "DELETE"
        })
        .then(() => fetch(`/api/v1/organisms`))
        .then(result => result.json())
        .then(result => setOrganisms(result));
    }

    function sendOrganismToEdit(e) {
        setOrganismNameToEdit(e.target.value); 
        setOrganismSpeciesToEdit(e.target.title);
        setOrganismId(e.target.name);
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>{species}</Card.Description>
                    <Link to="/entries">
                        <Button value={organismId} onClick={handleEntryClick}>see entries</Button>
                    </Link>
                    <Button value={name} title={species} name={organismId} onClick={sendOrganismToEdit}>edit plant</Button>
                    <Button value={organismId} onClick={handleDeleteOrganism}>plant died :(</Button>
                </Card.Content>
            </Card>
        </React.Fragment>
    );
}

export default OrganismCard;