import React, { useEffect, useState } from "react";
import Organisms from "./Organisms";

function Garden({ setOrganismId }) {
    const [ organisms, setOrganisms ] = useState([]);

    useEffect(() => {
        fetch("/api/v1/organisms")
        .then(result => result.json())
        .then(result => setOrganisms(result));
    }, []);

    console.log(organisms, "organisms")

    return (
        <React.Fragment>
            <Organisms organisms={organisms} setOrganismId={setOrganismId}/>
            {/* form to go here */}
        </React.Fragment>
    );
}

export default Garden;