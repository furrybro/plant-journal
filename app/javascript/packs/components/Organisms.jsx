import React from "react";
import OrganismCard from "./OrganismCard";
import { Row, Container } from "reactstrap";
import AddOrganismCard from "./AddOrganismCard";

function Organisms({ user, organisms, setOrganisms, setOrganismIdToEdit, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm, modal, setModal, setShowOrganismName }) {

    const renderEachOrganism = organisms.map((organism) => {
        if (organism.featured_image === null) {
            return <OrganismCard key={organism.id} user={user} name={organism.name} species={organism.species} organism={organism} organismId={organism.id} setOrganismIdToEdit={setOrganismIdToEdit} organisms={organisms} setOrganisms={setOrganisms} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} setShowOrganismName={setShowOrganismName}/>
        } else {
            return <OrganismCard key={organism.id} user={user} name={organism.name} species={organism.species} image={organism.featured_image.url} organismId={organism.id} setOrganismIdToEdit={setOrganismIdToEdit} organisms={organisms} setOrganisms={setOrganisms} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} setShowOrganismName={setShowOrganismName}/>
        }
    });

    const numRequired = 2;
    let numExtraFormCards = Math.max(numRequired - organisms.length, 0);

    let renderPlaceholderOrgCard = [];

    for (let i=0; i < numExtraFormCards; i++) {
        renderPlaceholderOrgCard.push(<AddOrganismCard modal={modal} setModal={setModal}/>)
    }

    return (
        <Container>
            <Row className="g-3">
                {renderEachOrganism}
                {renderPlaceholderOrgCard}
                <AddOrganismCard modal={modal} setModal={setModal}/>
            </Row>
        </Container>
    );
}

export default Organisms;