import React from "react";
import Calendar from "./Body/Calendar";
import { Container, Row, Col } from 'react-bootstrap';

function UserHomePageBody()
{
    return (<Container>
        <Row>
            <Col style={{border:"2px solid #ccc", borderRight : 0}}>
                <Calendar/>
            </Col>
            <Col style={{border:"2px solid #ccc" , borderLeft : 0}}>
                <Calendar/>
            </Col>
        </Row>
    </Container>)
}
export default UserHomePageBody