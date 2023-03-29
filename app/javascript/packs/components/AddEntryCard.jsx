import React from "react";
import { Col, Card, CardImg, CardBody, CardSubtitle, Button, CardText } from "reactstrap";
import cactus from "/app/assets/images/cactus";

function AddEntryCard({ modal, setModal }) {
    const toggle = () => setModal(!modal);

    return (
            <div style={{ fontFamily: 'Poppins', width: '18rem' }} className="card h-100">
                <img
                    alt="plant image placeholder"
                    src={cactus}
                    style={{ height: '35vh', objectFit: 'cover' }}
                    className="card-img-top"
                />
                <div className="card-body">
                    <CardSubtitle style={{ fontWeight: 'bold' }}>New Entry Date</CardSubtitle>
                    <CardText style={{ height: '45px', overflowY: 'auto', maxHeight: '45px' }}>What's new with your plant?</CardText>
                    <Button style={{ float: 'right', backgroundColor: 'rgba(176, 202, 148)', color: 'black' }} onClick={toggle}>add new entry +</Button>
                </div>
            </div>
    );
}

export default AddEntryCard;