import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

function OrganismCard({ name, species, orgid, setOrganismId }) {

    function handleEntryClick(e) {
        setOrganismId(e.target.value);
    }
    
    return (
        <React.Fragment>
            <div>
                <p>{name}</p>
                <p>{species}</p>
                <Link to="/entries">
                    <Button value={orgid} onClick={handleEntryClick}>see entries</Button>
                </Link>
            </div>
        </React.Fragment>
    );
}

export default OrganismCard;