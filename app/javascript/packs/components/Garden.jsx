import React, { useEffect, useState } from "react";
import Organisms from "./Organisms";
import OrganismForm from "./OrganismForm";

function Garden({ setOrganismId, user }) {
    const [ organisms, setOrganisms ] = useState([]);

    useEffect(() => {
        fetch("/api/v1/organisms")
        .then(result => result.json())
        .then(result => setOrganisms(result));
    }, []);

    return (
        <React.Fragment>
            <Organisms organisms={organisms} setOrganisms={setOrganisms} setOrganismId={setOrganismId}/>
            <OrganismForm user={user} organisms={organisms} setOrganisms={setOrganisms}/>
        </React.Fragment>
    );
}

export default Garden;