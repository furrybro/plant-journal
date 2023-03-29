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
        <div style={{ fontFamily: 'Poppins', width: '18rem' }} className="card h-100">
            <img
                alt="plant image placeholder"
                src={image !== undefined ? image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                style={{ height: '35vh', objectFit: 'cover' }}
                className="card-img-top"
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{species}</p>
                <div className="text-end">
                    <Link className="px-2" to={`/entries/${organismId}`}>
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
                </div>
            </div>
        </div>
    );
}

export default OrganismCard;