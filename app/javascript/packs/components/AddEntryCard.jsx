import React from "react";
import { Col, Card, CardImg, CardBody, CardSubtitle, Button, CardText } from "reactstrap";
import cactus from "/app/assets/images/cactus";

function AddEntryCard({ modal, setModal }) {
    const toggle = () => setModal(!modal);

    return (
        <Col className="col-12 col-md-6 col-lg-4">
            <Card style={{ fontFamily: 'Poppins' }}>
                <CardImg
                    alt="plant image placeholder"
                    src={cactus}
                    top
                    style={{ height: '35vh', objectFit: 'cover' }}
                    width="100%"
                />
                <CardBody>
                    <CardSubtitle style={{ fontWeight: 'bold' }}>New Entry Date</CardSubtitle>
                    <CardText style={{ height: '45px', overflowY: 'auto', maxHeight: '45px' }}>New Entry</CardText>
                    <Button style={{ float: 'right' }} onClick={toggle}>add new entry +</Button>
                </CardBody>
            </Card>
        </Col>
    );
}

export default AddEntryCard;