import React from "react";
import OrganismCard from "./OrganismCard";
import { CardDeck, CardGroup, Col, Row, Container } from "reactstrap";

function Organisms({ organisms, setOrganisms, setOrganismId, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm }) {
    
    const renderEachOrganism = organisms.map((organism) => {
        return <OrganismCard key={organism.id} name={organism.name} species={organism.species} organismId={organism.id} setOrganismId={setOrganismId} organisms={organisms} setOrganisms={setOrganisms} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm}/>
    })

    const columnsPerRow = 4;

    return (
        <Container className="container">
            <Row md={columnsPerRow}>
                {renderEachOrganism}
            </Row >
        </Container>
    );
}

export default Organisms;