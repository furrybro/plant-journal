import React, { useEffect, useState } from "react";
import { Card, Button, CardTitle, CardImg, CardSubtitle, CardBody, Container, Row, Col, Modal, Form, FormGroup, Input, Label } from "reactstrap";
import EntryForm from "./EntryForm";
import { DateTime } from "luxon";


function Entries({ organismId, entryForm, setEntryForm }) {
    const [entries, setEntries] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState("");
    const [dateToEdit, setDateToEdit] = useState(DateTime.now());
    const [entryId, setEntryId] = useState();
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const editToggle = () => setEntryForm(!entryForm);

    useEffect(() => {
        fetch(`/api/v1/entries/${organismId}`)
            .then(result => result.json())
            .then(result => setEntries(result));
    }, []);

    function changeNote(e) {
        let newNote = e.target.value;
        setNoteToEdit(newNote);
    }

    function changeDate(e) {
        let newDate = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'T")
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

        function handleDeleteEntry(e) {
            fetch(`/api/v1/entries/${e.target.value}`, {
                method: "DELETE"
            })
                .then(() => fetch(`/api/v1/entries/${organismId}`))
                .then(result => result.json())
                .then(result => setEntries(result));
        }

        function handleEditEntry() {
            setNoteToEdit(entry.note);
            setDateToEdit(entryDate);
            setEntryId(entry.id);
            setEntryForm(true);
        }

        if (entry.entry_image === null) {
            return (
                <Col>
                    <Card style={{ width: '18rem' }} key={entry.id}>
                        <CardImg
                            alt="entry image placeholder"
                            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"
                            top
                            style={{ height: '35vh', objectFit: 'cover' }}
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">{entry.note}</CardTitle>
                            <CardSubtitle tag="h6">{formatDate}</CardSubtitle>
                            <Button onClick={handleEditEntry}>edit entry</Button>
                            <Button value={entry.id} onClick={handleDeleteEntry}>delete entry</Button>
                        </CardBody>
                    </Card>
                </Col>
            );
        } else {
            return (
                <Col>
                    <Card style={{ width: '18rem' }} key={entry.id}>
                        <CardImg
                            alt="entry image placeholder"
                            src={entry.entry_image.url !== undefined ? entry.entry_image.url : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                            top
                            style={{ height: '35vh', objectFit: 'cover' }}
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">{entry.note}</CardTitle>
                            <CardSubtitle tag="h6">{formatDate}</CardSubtitle>
                            <Button onClick={handleEditEntry}>edit entry</Button>
                            <Button value={entry.id} onClick={handleDeleteEntry}>delete entry</Button>
                        </CardBody>
                    </Card>
                </Col>
            );
        }
    });

    return (
        <Container className="d-grid gap-3">
            <Row className="row-cols-4 row-cols-md-4 g-4">
                {renderEachEntry}
            </Row>
            <Button onClick={toggle}>Add new entry</Button>
            <Modal centered isOpen={modal} toggle={toggle}>
                <EntryForm organismId={organismId} setEntries={setEntries} modal={modal} setModal={setModal} />
            </Modal>
            <Modal centered isOpen={entryForm} toggle={editToggle}>
                <Form style={{ backgroundColor: 'rgba(176, 202, 148)', padding: '15px', borderRadius: '.5em' }} onSubmit={editEntry}>
                    <FormGroup>
                        <Label>Note:</Label>
                        <Input value={noteToEdit} onChange={changeNote} type="text" placeholder="Edit note here"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Date:</Label>
                        <Input value={dateToEdit.toFormat("yyyy-MM-dd'T'HH:mm")} onChange={changeDate} type="datetime-local"></Input>
                    </FormGroup>
                    <Button type="submit">Edit your entry</Button>
                </Form>
            </Modal>
        </Container>
    );
}

export default Entries;