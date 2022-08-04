import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Col, CardSubtitle, CardImg, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

function OrganismCard({ name, species, image, organismId, setOrganismIdToEdit, setOrganismNameToEdit, setOrganismSpeciesToEdit, setOrganismForm, deleteModal, setDeleteModal }) {
    function sendOrganismToEdit(e) {
        setOrganismNameToEdit(e.target.value);
        setOrganismSpeciesToEdit(e.target.title);
        setOrganismIdToEdit(e.target.name);
        setOrganismForm(true);
    }

    function sendOrganismToDelete(e) {
        setOrganismIdToEdit(e.target.value);
        setDeleteModal(!deleteModal);
    }

    return (
        <Col className="col-12 col-md-6 col-lg-4">
            <Card style={{ fontFamily: 'Poppins' }}>
                <CardImg
                    alt="plant image placeholder"
                    src={image !== undefined ? image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                    top
                    style={{ height: '35vh', objectFit: 'cover' }}
                    width="100%"
                />
                <CardBody>
                    <CardTitle tag="h4">{name}</CardTitle>
                    <CardSubtitle tag="h6">{species}</CardSubtitle>
                    <br></br>
                    <Link to={`/entries/${organismId}`}>
                        <Button value={organismId}>see entries</Button>
                    </Link>
                    <UncontrolledButtonDropdown style={{ float: 'right' }}>
                        <DropdownToggle style={{ borderRadius: '8px' }}>
                            ☰
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value={name} title={species} name={organismId} onClick={sendOrganismToEdit}>
                                edit plant
                            </DropdownItem>
                            <DropdownItem value={organismId} onClick={sendOrganismToDelete}>
                                plant died :(
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </CardBody>
            </Card>
        </Col>
    );
}

export default OrganismCard;