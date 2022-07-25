import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Col, Row, CardText, CardSubtitle, CardImg } from "reactstrap";

function OrganismCard({ name, species, organismId, setOrganismId, organisms, setOrganisms, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm }) {

    function handleEntryClick(e) {
        setOrganismId(e.target.value);
    }

    function handleDeleteOrganism(e) {
        fetch(`/api/v1/organisms/${e.target.value}`, {
            method: "DELETE"
        })
            .then(() => fetch(`/api/v1/organisms`))
            .then(result => result.json())
            .then(result => setOrganisms(result));
    }

    function sendOrganismToEdit(e) {
        setOrganismNameToEdit(e.target.value);
        setOrganismSpeciesToEdit(e.target.title);
        setOrganismId(e.target.name);
        setOrganismForm(true);
    }

    return (
        <React.Fragment>
            <Col>
                <Card className="orgcard" style={{width: "18rem"}}>
                    <CardImg
                        alt="cactus image placeholder"
                        src="https://www.thespruce.com/thmb/DU6yHor9U1YhA45DEFUqACZmw3o=/3450x2300/filters:no_upscale():max_bytes(150000):strip_icc()/kararileyzebra-4-49cac0d8528c425fafbe1ab4792c991c.jpg"
                        top
                        // style={{
                        //     height: 200
                        // }}
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h4">{name}</CardTitle>
                        <CardSubtitle tag="h6">{species}</CardSubtitle>
                        <br></br>
                        <Link to="/entries">
                            <Button value={organismId} onClick={handleEntryClick}>see entries</Button>
                        </Link>
                        <Button value={name} title={species} name={organismId} onClick={sendOrganismToEdit}>edit plant</Button>
                        <Button value={organismId} onClick={handleDeleteOrganism}>plant died :(</Button>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
}

export default OrganismCard;