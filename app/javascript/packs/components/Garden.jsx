import React, { useEffect, useState } from "react";
import Organisms from "./Organisms";
import OrganismForm from "./OrganismForm";

function Garden({ organismId, setOrganismId, user }) {
    const [ organisms, setOrganisms ] = useState([]);
    const [ organismNameToEdit, setOrganismNameToEdit ] = useState("");
    const [ organismSpeciesToEdit, setOrganismSpeciesToEdit ] = useState("");

    useEffect(() => {
        fetch("/api/v1/organisms")
        .then(result => result.json())
        .then(result => setOrganisms(result));
    }, []);

    return (
        <React.Fragment>
            <Organisms organisms={organisms} setOrganisms={setOrganisms} setOrganismId={setOrganismId} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit}/>
            <OrganismForm user={user} organisms={organisms} setOrganisms={setOrganisms} organismId={organismId} organismNameToEdit={organismNameToEdit} setOrganismNameToEdit={setOrganismNameToEdit} organismSpeciesToEdit={organismSpeciesToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit}/>
        </React.Fragment>
    );
}

export default Garden;