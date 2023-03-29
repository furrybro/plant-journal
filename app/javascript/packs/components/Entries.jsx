import React, { useEffect, useState } from "react";
import { Button, Container, Row, Modal, Form, FormGroup, Input, Label } from "reactstrap";
import EntryForm from "./EntryForm";
import EntryCard from "./EntryCard";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import AddEntryCard from "./AddEntryCard";

function Entries({ entryForm, setEntryForm, setShowOrganismName }) {
    const [entries, setEntries] = useState(null);
    const [noteToEdit, setNoteToEdit] = useState("");
    const [dateToEdit, setDateToEdit] = useState(DateTime.now());
    const [entryId, setEntryId] = useState();
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const organismId = useParams().organism_id;

    const toggle = () => setModal(!modal);
    const editToggle = () => setEntryForm(!entryForm);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        fetch(`/api/v1/entries/get_by_organism/${organismId}`)
            .then(result => result.json())
            .then(result => setEntries(result));

        fetch(`/api/v1/organisms/${organismId}`)
            .then(result => result.json())
            .then(result => setShowOrganismName(`${result.name} the ${result.species}`));
    }, []);

    if (entries === null) {
        return <div></div>
    }

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
            .then(() => fetch(`/api/v1/entries/get_by_organism/${organismId}`))
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
            return (
                <div className="col">
                    <EntryCard key={entry.id} entryId={entry.id} formatDate={formatDate} entryNote={entry.note} entryDate={entryDate} setNoteToEdit={setNoteToEdit} setDateToEdit={setDateToEdit} setEntryId={setEntryId} setEntryForm={setEntryForm} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                </div>
            )
        } else {
            return (
                <div className="col">
                    <EntryCard key={entry.id} entryId={entry.id} formatDate={formatDate} entryNote={entry.note} entryDate={entryDate} image={entry.entry_image.url} setNoteToEdit={setNoteToEdit} setDateToEdit={setDateToEdit} setEntryId={setEntryId} setEntryForm={setEntryForm} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                </div>
            )
        }
    });

    // const numRequired = 2;
    // let numExtraFormCards = Math.max(numRequired - entries.length, 0);

    // let renderPlaceholderEntryCard = [];

    // for (let i = 0; i < numExtraFormCards; i++) {
    //     renderPlaceholderEntryCard.push(<AddEntryCard modal={modal} setModal={setModal} />);
    // }

    function handleDeleteEntry(e) {
        fetch(`/api/v1/entries/${entryId}`, {
            method: "DELETE"
        })
            .then(() => fetch(`/api/v1/entries/get_by_organism/${organismId}`))
            .then(result => result.json())
            .then(result => setEntries(result));
    }

    return (
        <div className="container d-flex">
            <div className="row g-3">
                {renderEachEntry}
                <div className="col">
                    <AddEntryCard modal={modal} setModal={setModal} />
                </div>
            </div>
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
            <Modal centered isOpen={deleteModal} toggle={deleteToggle}>
                <Form style={{ backgroundColor: 'rgba(176, 202, 148)', padding: '15px', borderRadius: '.5em', fontFamily: 'Poppins' }} onSubmit={handleDeleteEntry}>
                    <FormGroup>
                        <Button style={{ float: 'right' }} className="btn-close" aria-label="Close" onClick={deleteToggle}></Button>
                        <Label>
                            Are you sure you want to delete your entry?
                        </Label>
                    </FormGroup>
                    <Button style={{ float: 'right' }} color="danger" onClick={deleteToggle} type="submit">yes, delete entry</Button>
                </Form>
            </Modal>
        </div>
    );
}

export default Entries;