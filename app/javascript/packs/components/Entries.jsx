import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import EntryForm from "./EntryForm";
import Moment from "moment";


function Entries({ organismId }) {
    const [ entries, setEntries ] = useState([]);
    const [ noteToEdit, setNoteToEdit ] = useState("");
    const [ dateToEdit, setDateToEdit ] = useState("");
    const [ entryId, setEntryId ] = useState();

    useEffect(() => {
        fetch(`/api/v1/entries/${organismId}`)
            .then(result => result.json())
            .then(result => setEntries(result));
    }, []);

    const renderEachEntry = entries.map((entry) => {
        const formatDate = Moment(entry.date).format('MMMM Do YYYY, h:mm a')

        function handleDeleteEntry(e) {
            fetch(`/api/v1/entries/${e.target.value}`, {
                method: "DELETE"
            })
            .then(() => fetch(`/api/v1/entries/${organismId}`))
            .then(result => result.json())
            .then(result => setEntries(result));
        }

        function handleEditEntry() {
            let editDate = Moment(entry.date).local().format('yyyy-MM-DThh:mm')
            setNoteToEdit(entry.note);
            setDateToEdit(editDate);
            setEntryId(entry.id);
            console.log(editDate, "date to edit before submit")
        }

        return (
            <React.Fragment>
                <Card key={entry.id}>
                    <Card.Header>{formatDate}</Card.Header>
                    <Card.Description>{entry.note}</Card.Description>
                    <Button onClick={handleEditEntry}>edit</Button>
                    <Button value={entry.id} onClick={handleDeleteEntry}>delete</Button>
                </Card>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            <h1>Entries</h1>
            {renderEachEntry}
            <EntryForm organismId={organismId} entries={entries} setEntries={setEntries} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} dateToEdit={dateToEdit} setDateToEdit={setDateToEdit} entryId={entryId}/>
        </React.Fragment>
    );
}

export default Entries;