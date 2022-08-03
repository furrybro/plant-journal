import React from "react";
import { Card, CardImg, CardSubtitle, CardText, CardBody, Col, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

function EntryCard({ entryId, setEntries, formatDate, entryNote, entryDate, image, setNoteToEdit, setDateToEdit, setEntryId, setEntryForm, organismId }) {

    function handleDeleteEntry(e) {
        fetch(`/api/v1/entries/${e.target.value}`, {
            method: "DELETE"
        })
            .then(() => fetch(`/api/v1/entries/get_by_organism/${organismId}`))
            .then(result => result.json())
            .then(result => setEntries(result));
    }

    function handleEditEntry() {
        setNoteToEdit(entryNote);
        setDateToEdit(entryDate);
        setEntryId(entryId);
        setEntryForm(true);
    }

    return (
        <Col className="col-12 col-md-6 col-lg-4">
            <Card style={{ fontFamily: 'Poppins' }}>
                <CardImg
                    alt="entry image placeholder"
                    src={image !== undefined ? image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                    top
                    style={{ height: '35vh', objectFit: 'cover' }}
                    width="100%"
                />
                <CardBody>
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
                            <DropdownItem value={entryId} onClick={handleDeleteEntry}>
                                delete entry
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </CardBody>
            </Card>
        </Col>
    );
}

export default EntryCard;