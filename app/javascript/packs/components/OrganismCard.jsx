import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";

function OrganismCard({ name, species, orgid, setOrganismId }) {

    function handleEntryClick(e) {
        setOrganismId(e.target.value);
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>{species}</Card.Description>
                    <Link to="/entries">
                        <Button value={orgid} onClick={handleEntryClick}>see entries</Button>
                    </Link>
                </Card.Content>
            </Card>
        </React.Fragment>
    );
}

export default OrganismCard;