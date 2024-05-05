import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, FloatingLabel, FormControl, Container, Row} from 'react-bootstrap';
import {useCookies} from "react-cookie";


const UserForm = ({onAddProduct}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [distance, setDistance] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: cookies.user.name,
            company: cookies.user.id_company,
            token: cookies.user.token
        }
        fetch("http://localhost:3001/machines/add", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                name: user.username,
                token: user.token,
                id_company: user.company,

                machine_name: name,
                description: ((description==='')&&("No description "))+description ,
                distance: distance
            })
        }).then((response) => {
            if (response.ok) {
                setName('');
                setDescription('');
                setDistance(0)
            }
            else
            {
                console.log(response)
            }
        })

    };

    return (
        <Container>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Machine Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <FloatingLabel controlId="description" label="Description">
                            <FormControl
                                as="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}

                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Distance in minutes</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.5"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}

                            min={0}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </Row>
        </Container>

    );
};

export default UserForm