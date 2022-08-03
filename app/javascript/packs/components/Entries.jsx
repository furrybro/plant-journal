import React, { useEffect, useState } from "react";
import { Card, Button, CardImg, CardSubtitle, CardText, CardBody, Container, Row, Col, Modal, Form, FormGroup, Input, Label } from "reactstrap";
import EntryForm from "./EntryForm";
import EntryCard from "./EntryCard";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import cactus from "/app/assets/images/cactus";

function Entries({ entryForm, setEntryForm }) {
    const [entries, setEntries] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState("");
    const [dateToEdit, setDateToEdit] = useState(DateTime.now());
    const [entryId, setEntryId] = useState();
    const [modal, setModal] = useState(false);

    const organismId = useParams().organism_id;
  
    const toggle = () => setModal(!modal);
    const editToggle = () => setEntryForm(!entryForm);

    useEffect(() => {
        fetch(`/api/v1/entries/${organismId}`)
            .then(result => result.json())
            .then(result => {
                setEntries(result);
                // setShowOrganismName(`${result[0].organism.name} the ${result[0].organism.species}`);
            });
    }, []);

    function changeNote(e) {
        let newNote = e.target.value;
        setNoteToEdit(newNote);
    }

    function changeDate(e) {
        let newDate = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'T");
        setDateToEdit(newDate);
    }

    function editEntry(e) {
        e.preventDefault();

        let editEntryObj = {
            note: noteToEdit,
            date: dateToEdit,
            organism_id: organismId
        }

        fetch(`/api/v1/entries/${entryId}}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(editEntryObj)
        })
            .then(result => result.json())
            .then(() => fetch(`/api/v1/entries/${organismId}`))
            .then(result => result.json())
            .then(result => setEntries(result));

        e.target.reset();
        setNoteToEdit("");
        setDateToEdit(DateTime.now());
        setEntryForm(false);
    }

    const renderEachEntry = entries.map((entry) => {
        let entryDate = DateTime.fromISO(entry.date);
        let formatDate = entryDate.toLocaleString(DateTime.DATETIME_FULL);

        if (entry.entry_image === null) {
            return <EntryCard key={entry.id} entryId={entry.id} setEntries={setEntries} formatDate={formatDate} entryNote={entry.note} entryDate={entryDate} setNoteToEdit={setNoteToEdit} setDateToEdit={setDateToEdit} setEntryId={setEntryId} setEntryForm={setEntryForm} organismId={organismId}/>
        } else {
            return <EntryCard key={entry.id} entryId={entry.id} setEntries={setEntries} formatDate={formatDate} entryNote={entry.note} entryDate={entryDate} image={entry.entry_image.url} setNoteToEdit={setNoteToEdit} setDateToEdit={setDateToEdit} setEntryId={setEntryId} setEntryForm={setEntryForm} organismId={organismId}/>
        }
    })

    return (
        <div>
            <Container>
                <Row className="g-3">
                    {renderEachEntry}
                    <Col className="col-12 col-md-6 col-lg-4">
                        <Card style={{ fontFamily: 'Poppins' }}>
                            <CardImg
                                alt="plant image placeholder"
                                src={cactus}
                                top
                                style={{ height: '35vh', objectFit: 'cover' }}
                                width="100%"
                            />
                            <CardBody>
                                <CardSubtitle style={{ fontWeight: 'bold' }}>New Entry Date</CardSubtitle>
                                <CardText style={{ height: '45px', overflowY: 'auto', maxHeight: '45px' }}>New Entry</CardText>
                                <Button style={{ float: 'right' }} onClick={toggle}>add new entry +</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal centered isOpen={modal} toggle={toggle}>
                    <EntryForm organismId={organismId} setEntries={setEntries} modal={modal} setModal={setModal} />
                </Modal>
                <Modal centered isOpen={entryForm} toggle={editToggle}>
                    <Form style={{ backgroundColor: 'rgba(176, 202, 148)', padding: '15px', borderRadius: '.5em', fontFamily: 'Poppins' }} onSubmit={editEntry}>
                        <FormGroup>
                            <Label>Note:</Label>
                            <Input value={noteToEdit} onChange={changeNote} type="textarea" placeholder="Edit note here"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Date:</Label>
                            <Input value={dateToEdit.toFormat("yyyy-MM-dd'T'HH:mm")} onChange={changeDate} type="datetime-local"></Input>
                        </FormGroup>
                        <Button type="submit">Edit your entry</Button>
                    </Form>
                </Modal>
            </Container>
        </div>
    );
}

export default Entries;