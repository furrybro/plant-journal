import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { DateTime } from "luxon";

function EntryForm({ organismId, entries, setEntries, noteToEdit, setNoteToEdit, dateToEdit, setDateToEdit, entryId }) {
    const [ newEntryNote, setNewEntryNote ] = useState("");
    const [ newEntryDate, setNewEntryDate ] = useState(DateTime.now());

    function handleNewEntryNote(e) {
        setNewEntryNote(e.target.value);
    }

    function handleNewEntryDate(e) {
        let newDate = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'T")
        setNewEntryDate(newDate);
    }

    function addNewNote(e) {
        e.preventDefault();

        let newEntryObj = {
            note: newEntryNote,
            date: newEntryDate,
            organism_id: organismId
        };

        fetch(`/api/v1/entries/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(newEntryObj)
        })
            .then(result => result.json())
            .then(result => setEntries([...entries, result]))

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
    }

    return (
        <React.Fragment>
            <Form onSubmit={addNewNote}>
                <Form.Field>
                    <label>Note:</label>
                    <Form.Input value={newEntryNote} onChange={handleNewEntryNote} type="text" placeholder="What's going on with your plant today?"></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Date:</label>
                    <Form.Input value={newEntryDate.toFormat("yyyy-MM-dd'T'HH:mm")} onChange={handleNewEntryDate} type="datetime-local"></Form.Input>
                </Form.Field>
                <Button type="submit">Add new entry</Button>
            </Form>
            <Form onSubmit={editEntry}>
                <Form.Field>
                    <label>Note:</label>
                    <Form.Input value={noteToEdit} onChange={changeNote} type="text" placeholder="Edit note here"></Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Date:</label>
                    <Form.Input value={dateToEdit.toFormat("yyyy-MM-dd'T'HH:mm")} onChange={changeDate} type="datetime-local"></Form.Input>
                </Form.Field>
                <Button type="submit">Edit your entry</Button>
            </Form>
        </React.Fragment>
    );
}

export default EntryForm;