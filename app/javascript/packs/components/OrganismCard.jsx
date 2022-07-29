import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Col, CardSubtitle, CardImg, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

function OrganismCard({ user, name, species, image, organism, organismId, setOrganismId, organisms, setOrganisms, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm }) {

    function handleEntryClick(e) {
        setOrganismId(e.target.value);
    }

    function handleDeleteOrganism(e) {
        fetch(`/api/v1/organisms/${e.target.value}`, {
            method: "DELETE"
        })
            .then(() => fetch(`/api/v1/organisms/${user.id}`))
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
        <Col>
            <Card style={{ width: '18rem' }}>
                <CardImg
                    alt="organism image placeholder"
                    src={image !== undefined ? image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                    top
                    style={{ height: '35vh', objectFit: 'cover' }}
                    width="100%"
                />
                <CardBody>
                    <CardTitle tag="h4">{name}</CardTitle>
                    <CardSubtitle tag="h6">{species}</CardSubtitle>
                    <br></br>
                    <ButtonGroup>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret>
                                options
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <Link to="/entries">
                                        <Button value={organismId} onClick={handleEntryClick}>see entries</Button>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button value={name} title={species} name={organismId} onClick={sendOrganismToEdit}>edit plant</Button>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button value={organismId} onClick={handleDeleteOrganism}>plant died :(</Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </Col>
    );
}

export default OrganismCard;