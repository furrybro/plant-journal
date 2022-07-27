import React, { useEffect, useState } from "react";
import Organisms from "./Organisms";
import OrganismForm from "./OrganismForm";

function Garden({ organismId, setOrganismId, user }) {
    const [ organisms, setOrganisms ] = useState([]);
    const [ organismNameToEdit, setOrganismNameToEdit ] = useState("");
    const [ organismSpeciesToEdit, setOrganismSpeciesToEdit ] = useState("");
    const [ organismForm, setOrganismForm ] = useState(false);

    useEffect(() => {
        fetch(`/api/v1/organisms/${user.id}`)
        .then(result => result.json())
        .then(result => setOrganisms(result));
    }, []);

    return (
        <React.Fragment>
            <Organisms user={user} organisms={organisms} setOrganisms={setOrganisms} setOrganismId={setOrganismId} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm}/>
            <OrganismForm user={user} organisms={organisms} setOrganisms={setOrganisms} organismId={organismId} organismNameToEdit={organismNameToEdit} setOrganismNameToEdit={setOrganismNameToEdit} organismSpeciesToEdit={organismSpeciesToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} organismForm={organismForm} setOrganismForm={setOrganismForm}/>
        </React.Fragment>
    );
}

export default Garden;