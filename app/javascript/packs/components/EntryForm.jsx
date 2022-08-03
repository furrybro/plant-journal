import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { DateTime } from "luxon";

function EntryForm({ organismId, setEntries, modal, setModal }) {
    const [newEntryNote, setNewEntryNote] = useState("");
    const [newEntryDate, setNewEntryDate] = useState(DateTime.now());
    const [newEntryPhoto, setNewEntryPhoto] = useState(null);

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

        const formData = new FormData();
        formData.append('note', newEntryNote);
        formData.append('date', newEntryDate);
        formData.append('organism_id', organismId);
        formData.append('entry_image', newEntryPhoto);

        fetch(`/api/v1/entries/`, {
            method: "POST",
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

    return (
        <div>
            <Form style={{ backgroundColor: 'rgba(176, 202, 148)', padding: '15px', borderRadius: '.5em', fontFamily: 'Poppins' }} onSubmit={addNewNote}>
                <FormGroup>
                    <Label>Note:</Label>
                    <Input value={newEntryNote} onChange={handleNewEntryNote} type="textarea" placeholder="What's going on with your plant today?"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Date:</Label>
                    <Input value={newEntryDate.toFormat("yyyy-MM-dd'T'HH:mm")} onChange={handleNewEntryDate} type="datetime-local"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Photo:</Label>
                    <Input onChange={handleNewEntryPhoto} type="file" accept="image/*" placeholder="Upload photo here"></Input>
                </FormGroup>
                <Button onClick={() => setModal(!modal)} type="submit" disabled={!newEntryNote || !newEntryDate || !newEntryPhoto}>Add new entry</Button>
            </Form>
        </div>
    );
}

export default EntryForm;