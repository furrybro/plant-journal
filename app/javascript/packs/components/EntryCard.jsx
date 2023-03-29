import React from "react";
import { Card, CardImg, CardSubtitle, CardText, CardBody, Col, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

function EntryCard({ entryId, formatDate, entryNote, entryDate, image, setNoteToEdit, setDateToEdit, setEntryId, setEntryForm, deleteModal, setDeleteModal }) {
    function handleEditEntry() {
        setNoteToEdit(entryNote);
        setDateToEdit(entryDate);
        setEntryId(entryId);
        setEntryForm(true);
    }

    function sendEntryToDelete(e) {
        setEntryId(entryId);
        setDeleteModal(!deleteModal);
    }

    return (
        <div style={{ fontFamily: 'Poppins', width: '18rem' }} className="card h-100">
                <img
                    alt="entry image placeholder"
                    src={image !== undefined ? image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                    style={{ height: '35vh', objectFit: 'cover' }}
                    className="card-img-top"
                />
                <div className="card-body">
                    <CardSubtitle style={{ fontWeight: 'bold' }}>{formatDate}</CardSubtitle>
                    <CardText style={{ height: '45px', overflow: 'auto', maxHeight: '45px' }}>{entryNote}</CardText>
                    <UncontrolledButtonDropdown style={{ float: 'right' }}>
                        <DropdownToggle style={{ borderRadius: '8px' }}>
                            ☰
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleEditEntry}>
                                edit entry
                            </DropdownItem>
                            <DropdownItem value={entryId} onClick={sendEntryToDelete}>
                                delete entry
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            </div>
    );
}

export default EntryCard;