import React from "react";
import { Card, Col, CardBody, Button, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import cactus from "/app/assets/images/cactus";

function AddOrganismCard({ modal, setModal }) {
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
                    <CardTitle tag="h4">Plant Name</CardTitle>
                    <CardSubtitle tag="h6">Plant Species</CardSubtitle>
                    <br></br>
                    <Button style={{ float: 'right' }} onClick={toggle}>add new plant +</Button>
                </CardBody>
            </Card>
        </Col>
    )
}

export default AddOrganismCard;