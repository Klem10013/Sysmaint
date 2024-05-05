import React from "react";
import Calendar from "./Body/Calendar";
import {Container, Row, Col,} from 'react-bootstrap';
import UserInformation from "./Body/User information";
import Machinesinfo from "./Body/Machinesinfo";

function UserHomePageBody() {
    return (<Container>
        <Row>
            <Col style={{border: "2px solid #ccc", borderRight: 0}}>
                <Calendar/>
            </Col>
            <Col style={{border: "2px solid #ccc", borderLeft: 0}}>
                <div>
                    <UserInformation/>
                    <Machinesinfo/>
                </div>
            </Col>
        </Row>
    </Container>)
}

export default UserHomePageBody