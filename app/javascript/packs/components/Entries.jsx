import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
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

        return (
            <React.Fragment>
                <Card>
                    <Card.Header>{formatDate}</Card.Header>
                    <Card.Description>{entry.note}</Card.Description>
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