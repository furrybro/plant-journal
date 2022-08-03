import React, { useEffect, useState } from "react";
import Organisms from "./Organisms";
import OrganismForm from "./OrganismForm";

function Garden({ user, setShowOrganismName }) {
    const [organisms, setOrganisms] = useState([]);
    const [organismNameToEdit, setOrganismNameToEdit] = useState("");
    const [organismSpeciesToEdit, setOrganismSpeciesToEdit] = useState("");
    const [organismForm, setOrganismForm] = useState(false);
    const [modal, setModal] = useState(false);
    const [organismIdToEdit, setOrganismIdToEdit] = useState();

    useEffect(() => {
        fetch(`/api/v1/organisms/${user.id}`)
            .then(result => result.json())
            .then(result => setOrganisms(result));
            setShowOrganismName("");
    }, []);

    return (
        <div>
            <div className="d-flex">
                <Organisms user={user} organisms={organisms} setOrganisms={setOrganisms} setOrganismIdToEdit={setOrganismIdToEdit} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} modal={modal} setModal={setModal}/>
            </div>
            <OrganismForm user={user} organisms={organisms} setOrganisms={setOrganisms} organismIdToEdit={organismIdToEdit} organismNameToEdit={organismNameToEdit} setOrganismNameToEdit={setOrganismNameToEdit} organismSpeciesToEdit={organismSpeciesToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} organismForm={organismForm} setOrganismForm={setOrganismForm} modal={modal} setModal={setModal}/>
        </div>
    );
}

export default Garden;