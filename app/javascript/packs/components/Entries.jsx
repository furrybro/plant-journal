import React, { useEffect, useState } from "react";
import { Card, Button, CardTitle, CardText, CardGroup, CardSubtitl, CardImg, CardSubtitle, CardBody } from "reactstrap";
import EntryForm from "./EntryForm";
import { DateTime } from "luxon";


function Entries({ organismId, entryForm, setEntryForm }) {
    const [entries, setEntries] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState("");
    const [dateToEdit, setDateToEdit] = useState(DateTime.now());
    const [entryId, setEntryId] = useState();

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
            setEntryForm(true);
        }

        if (entry.entry_image === null) {
            return (
                <React.Fragment>
                    <Card key={entry.id}>
                        <CardImg
                            alt="entry image placeholder"
                            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">{entry.note}</CardTitle>
                            <CardSubtitle tag="h6">{formatDate}</CardSubtitle>
                            <Button onClick={handleEditEntry}>edit entry</Button>
                            <Button value={entry.id} onClick={handleDeleteEntry}>delete entry</Button>
                        </CardBody>
                    </Card>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Card key={entry.id}>
                        <CardImg
                            alt="entry image placeholder"
                            src={entry.entry_image.url !== undefined ? entry.entry_image.url : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*"}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">{entry.note}</CardTitle>
                            <CardSubtitle tag="h6">{formatDate}</CardSubtitle>
                            <Button onClick={handleEditEntry}>edit entry</Button>
                            <Button value={entry.id} onClick={handleDeleteEntry}>delete entry</Button>
                        </CardBody>
                    </Card>
                </React.Fragment>
            );
        }
    });

    return (
        <React.Fragment>
            <h1>Entries</h1>
            <CardGroup>
                {renderEachEntry}
            </CardGroup>
            <EntryForm organismId={organismId} entries={entries} setEntries={setEntries} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} dateToEdit={dateToEdit} setDateToEdit={setDateToEdit} entryId={entryId} entryForm={entryForm} setEntryForm={setEntryForm} />
        </React.Fragment>
    );
}

export default Entries;