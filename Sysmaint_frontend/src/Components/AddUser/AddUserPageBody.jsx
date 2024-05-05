import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, FloatingLabel, FormControl, Container, Row, Col} from 'react-bootstrap';
import UserForm from "./Body/UserForm";
import Userinfo from "./Body/Userinfo";


const AddUserPageBody = ({onAddProduct}) => {

    return (
        <Container>
            <Row>
                <Col style={{border: "2px solid #ccc", borderRight: 0}}>
                    <div style={{paddingBottom:10}}>
                        <UserForm/>
                    </div>
                </Col>
                <Col style={{border: "2px solid #ccc", borderLeft: 0}}>
                    <Userinfo/>
                </Col>
            </Row>
        </Container>

    );
};

export default AddUserPageBody