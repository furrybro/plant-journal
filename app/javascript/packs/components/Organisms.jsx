import React from "react";
import OrganismCard from "./OrganismCard";

function Organisms({ organisms, setOrganisms, setOrganismId }) {
    
    const renderEachOrganism = organisms.map((organism) => {
        return <OrganismCard key={organism.id} name={organism.name} species={organism.species} organismId={organism.id} setOrganismId={setOrganismId} organisms={organisms} setOrganisms={setOrganisms}/>
    })

    return (
        <React.Fragment>
            <div>{renderEachOrganism}</div>
        </React.Fragment>
    );
}

export default Organisms;