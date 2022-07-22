import React, { useEffect, useState } from "react";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import EntryForm from "./EntryForm";
import { DateTime } from "luxon";


function Entries({ organismId }) {
    const [ entries, setEntries ] = useState([]);
    const [ noteToEdit, setNoteToEdit ] = useState("");
    const [ dateToEdit, setDateToEdit ] = useState(DateTime.now());
    const [ entryId, setEntryId ] = useState();

    useEffect(() => {
        fetch(`/api/v1/entries/${organismId}`)
            .then(result => result.json())
            .then(result => setEntries(result));
    }, []);

    const renderEachEntry = entries.map((entry) => {
        let entryDate = DateTime.fromISO(entry.date)
        let formatDate = entryDate.toLocaleString(DateTime.DATETIME_FULL)

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
        }

        return (
            <React.Fragment>
                <Card key={entry.id}>
                    <CardTitle>{formatDate}</CardTitle>
                    <CardText>{entry.note}</CardText>
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