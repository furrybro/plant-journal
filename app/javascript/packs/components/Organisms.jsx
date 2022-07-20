import React from "react";
import OrganismCard from "./OrganismCard";

function Organisms({ organisms, setOrganismId }) {
    
    const renderEachOrganism = organisms.map((organism) => {
        return <OrganismCard key={organism.id} name={organism.name} species={organism.species} orgid={organism.id} setOrganismId={setOrganismId}/>
    })

    return (
        <React.Fragment>
            <div>{renderEachOrganism}</div>
        </React.Fragment>
    );
}

export default Organisms;