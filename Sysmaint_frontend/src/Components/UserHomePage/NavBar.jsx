import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';




function NavBar(tbProp) {
    const history = useNavigate();

    const redirectToHomePage = () => {
        history('/'); // Redirects to the '/login' route
    };

    return (
        <>
        <Navbar bg="5356FF" expand="lg" className="bg-body-tertiary">
            <Navbar.Brand style={{marginLeft: "20px"}} href="#home">
                <img src={require("../../image/Logo.png")} className="img-fluid" alt="Your Image"
                     style={{height: "30px", width: "30px", marginRight: "10px"}}/>
                {tbProp.name}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={redirectToHomePage}>Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}

export default NavBar;