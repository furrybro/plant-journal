import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { DateTime } from "luxon";

function EntryForm({ organismId, entries, setEntries, noteToEdit, setNoteToEdit, dateToEdit, setDateToEdit, entryId, entryForm, setEntryForm }) {
    const [ newEntryNote, setNewEntryNote ] = useState("");
    const [ newEntryDate, setNewEntryDate ] = useState(DateTime.now());
    const [ newEntryPhoto, setNewEntryPhoto ] = useState(null);

    function handleNewEntryNote(e) {
        setNewEntryNote(e.target.value);
    }

    function handleNewEntryDate(e) {
        let newDate = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'T");
        setNewEntryDate(newDate);
    }

    function handleNewEntryPhoto(e) {
        setNewEntryPhoto(e.target.files[0]);
    }

    function addNewNote(e) {
        e.preventDefault();

        // let newEntryObj = {
        //     note: newEntryNote,
        //     date: newEntryDate,
        //     organism_id: organismId
        // };

        const formData = new FormData();
        formData.append('note', newEntryNote);
        formData.append('date', newEntryDate);
        formData.append('organism_id', organismId);
        formData.append('entry_image', newEntryPhoto);

        fetch(`/api/v1/entries/`, {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            //     "Accepts": "application/json",
            // },
            body: formData
        })
            .then(result => result.json())
            .then(() => fetch(`/api/v1/entries/${organismId}`))
            .then(result => result.json())
            .then(result => setEntries(result));

        e.target.reset();
        setNewEntryNote("");
        setNewEntryDate(DateTime.now());
    }

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

    return (
        <React.Fragment>
            <div className="entryformdiv">
                <div className="newentryform">
                    <Form onSubmit={addNewNote}>
                        <FormGroup>
                            <Label>Note:</Label>
                            <Input value={newEntryNote} onChange={handleNewEntryNote} type="text" placeholder="What's going on with your plant today?"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Date:</Label>
                            <Input value={newEntryDate.toFormat("yyyy-MM-dd'T'HH:mm")} onChange={handleNewEntryDate} type="datetime-local"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Photo:</Label>
                            <Input onChange={handleNewEntryPhoto} type="file" accept="image/*" placeholder="Upload photo here"></Input>
                        </FormGroup>
                        <Button type="submit">Add new entry</Button>
                    </Form>
                </div>
                {entryForm ? (
                    <div className="editentryform">
                        <Form onSubmit={editEntry}>
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
                    </div>
                ) : (
                    null
                )}
            </div>
        </React.Fragment>
    );
}

export default EntryForm;