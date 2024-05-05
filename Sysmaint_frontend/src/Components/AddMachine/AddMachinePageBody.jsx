import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Machinesinfo from "../UserHomePage/Body/Machinesinfo";
import MachineForm from "./MachineForm";


function AddMachinePageBody() {
    return (
        <Container>
            <Row>
                <Col style={{border: "2px solid #ccc", borderRight: 0}}>
                    <MachineForm/>
                </Col>
                <Col style={{border: "2px solid #ccc", borderLeft: 0}}>
                    <Machinesinfo/>
                </Col>
            </Row>
        </Container>)
}

export default AddMachinePageBody