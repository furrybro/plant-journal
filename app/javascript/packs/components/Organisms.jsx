import React from "react";
import OrganismCard from "./OrganismCard";
import AddOrganismCard from "./AddOrganismCard";

function Organisms({ organisms, setOrganismIdToEdit, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm, modal, setModal, deleteModal, setDeleteModal }) {
    const renderEachOrganism = organisms.map((organism) => {
        if (organism.featured_image === null) {
            return (
                <div className="col">
                    <OrganismCard key={organism.id} name={organism.name} species={organism.species} organismId={organism.id} setOrganismIdToEdit={setOrganismIdToEdit} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                </div>
            )
        } else {
            return (
                <div className="col">
                    <OrganismCard key={organism.id} name={organism.name} species={organism.species} image={organism.featured_image.url} organismId={organism.id} setOrganismIdToEdit={setOrganismIdToEdit} setOrganismNameToEdit={setOrganismNameToEdit} setOrganismSpeciesToEdit={setOrganismSpeciesToEdit} setOrganismForm={setOrganismForm} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                </div>
            )
        }
    });

    // const numRequired = 2;
    // let numExtraFormCards = Math.max(numRequired - organisms.length, 0);

    // let renderPlaceholderOrgCard = [];

    // for (let i=0; i < numExtraFormCards; i++) {
    //     renderPlaceholderOrgCard.push(<AddOrganismCard modal={modal} setModal={setModal} />);
    // }

    return (
        <div className="container d-flex">
            <div className="row g-3">
                {renderEachOrganism}
                <div className="col">
                    <AddOrganismCard modal={modal} setModal={setModal} />
                </div>
            </div>
        </div>
    );
}

export default Organisms;
