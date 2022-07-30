import React from "react";
import OrganismCard from "./OrganismCard";
import { Card, Col, Row, Container, CardBody, Button } from "reactstrap";

function Organisms({ user, organisms, setOrganisms, setOrganismId, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm, modal, setModal }) {

    const toggle = () => setModal(!modal);

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
                <Col>
                    <Card style={{ width: '18rem', height: '438.72px' }}>
                        <CardBody className="text-center">
                            <Button onClick={toggle}>Add new plant</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Organisms;