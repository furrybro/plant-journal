import React from "react";
import { Card, Col, CardBody, Button, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import cactus from "/app/assets/images/cactus";

function AddOrganismCard({ modal, setModal }) {
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
                    <h5 className="card-title">Plant Name</h5>
                    <p className="card-text">Plant Species</p>
                    <Button style={{ float: 'right', backgroundColor: 'rgba(176, 202, 148)', color: 'black' }} onClick={toggle}>add new plant +</Button>
                </div>
            </div>
    )
}

export default AddOrganismCard;