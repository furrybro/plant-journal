import React from "react";
import OrganismCard from "./OrganismCard";
import { CardDeck, CardGroup, Col, Row, Container } from "reactstrap";

function Organisms({ user, organisms, setOrganisms, setOrganismId, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm }) {

    const renderEachOrganism = organisms.map((organism) => {
        if (organism.featured_image === null) {
            return <OrganismCard key={organism.id} user={user} name={organism.name} species={organism.species} organism={organism} organismId={organism.id} setOrganismId={setOrganismId} organisms={organisms} setOrganisms={setOrganisms} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} />
        }
        else {
            return <OrganismCard key={organism.id} user={user} name={organism.name} species={organism.species} image={organism.featured_image.url} organismId={organism.id} setOrganismId={setOrganismId} organisms={organisms} setOrganisms={setOrganisms} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} />
        }
    })

    return (
        <Container className="d-grid gap-3">
            <Row className="row-cols-4 row-cols-md-4 g-4">
              {renderEachOrganism}  
            </Row>
        </Container>
    );
}

export default Organisms;