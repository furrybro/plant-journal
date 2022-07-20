import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";


function Entries({ organismId }) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/entries/${organismId}`)
            .then(result => result.json())
            .then(result => setEntries(result));
    }, []);

    const renderEachEntry = entries.map((entry) => {
        return (
            <>
                <Card>
                    <Card.Header>{entry.note}</Card.Header>
                </Card>
            </>
        );
    });

    return (
        <React.Fragment>
            <h1>Entries!</h1>
            {renderEachEntry}
        </React.Fragment>
    );
}

export default Entries;