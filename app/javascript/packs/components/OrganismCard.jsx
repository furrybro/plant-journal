import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";

function OrganismCard({ name, species, organismId, setOrganismId, organisms, setOrganisms }) {

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

    return (
        <React.Fragment>
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>{species}</Card.Description>
                    <Link to="/entries">
                        <Button value={organismId} onClick={handleEntryClick}>see entries</Button>
                    </Link>
                    <Button value={organismId} onClick={handleDeleteOrganism}>plant died :(</Button>
                </Card.Content>
            </Card>
        </React.Fragment>
    );
}

export default OrganismCard;