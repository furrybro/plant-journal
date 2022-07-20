import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function EntryForm({ organismId, entries, setEntries }) {
    const [ newEntryNote, setNewEntryNote ] = useState("");
    const [ newEntryDate, setNewEntryDate ] = useState();

    function handleNewEntryNote(e) {
        setNewEntryNote(e.target.value);
    }

    function handleNewEntryDate(e) {
        setNewEntryDate(e.target.value);
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
    }

    return (
        <Form onSubmit={addNewNote}>
            <Form.Field>
                <label>Note:</label>
                <Form.Input onChange={handleNewEntryNote} type="text" placeholder="What's going on with your plant today?"></Form.Input>
            </Form.Field>
            <Form.Field>
                <label>Date:</label>
                <Form.Input onChange={handleNewEntryDate} type="datetime-local"></Form.Input>
            </Form.Field>
            <Button type="submit">Add new entry!</Button>
        </Form>
    );
}

export default EntryForm;