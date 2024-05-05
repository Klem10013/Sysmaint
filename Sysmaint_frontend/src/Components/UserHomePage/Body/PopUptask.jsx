import React from "react";
import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const PopUptask = ({product, onHide}) => {
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{marginBottom: 3}}>{product.description}</p>
                {product.machine_link_id !== undefined && <p style={{marginBottom: 3}}><strong>Machine : </strong>{product.machine_link_id}</p>}
                <p style={{marginBottom: 3}}><strong>Time duration : </strong>{product.time_duration} min </p>
                {product.time_bet !== undefined && <p style={{marginBottom: 3}}><strong>Time between each task : </strong>{product.time_bet} day</p>}
                {product.last_check !== undefined && <p style={{marginBottom: 3}}><strong>Last Time done : </strong>{(new Date(product.last_check)).toLocaleDateString("en-US")}</p>}
            </Modal.Body>
            {/* Add more product details here */}
            <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopUptask