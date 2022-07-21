import React from "react";
import OrganismCard from "./OrganismCard";

function Organisms({ organisms, setOrganisms, setOrganismId, setOrganismNameToEdit, setOrganismSpeciesToEdit }) {
    
    const renderEachOrganism = organisms.map((organism) => {
        return <OrganismCard key={organism.id} name={organism.name} species={organism.species} organismId={organism.id} setOrganismId={setOrganismId} organisms={organisms} setOrganisms={setOrganisms} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit}/>
    })

    return (
        <React.Fragment>
            <div>{renderEachOrganism}</div>
        </React.Fragment>
    );
}

export default Organisms;