import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import EntryForm from "./EntryForm";
import Moment from "moment";


function Entries({ organismId }) {
    const [entries, setEntries] = useState([]);

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

        return (
            <React.Fragment>
                <Card>
                    <Card.Header>{formatDate}</Card.Header>
                    <Card.Description>{entry.note}</Card.Description>
                    <Button>edit</Button>
                    <Button value={entry.id} onClick={handleDeleteEntry}>delete</Button>
                </Card>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            <h1>Entries</h1>
            {renderEachEntry}
            <EntryForm organismId={organismId} entries={entries} setEntries={setEntries}/>
        </React.Fragment>
    );
}

export default Entries;