import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import EntryForm from "./EntryForm";


function Entries({ organismId }) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/entries/${organismId}`)
            .then(result => result.json())
            .then(result => setEntries(result));
    }, []);

    const renderEachEntry = entries.map((entry) => {
        return (
            <React.Fragment>
                <Card>
                    <Card.Header>{entry.note}</Card.Header>
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