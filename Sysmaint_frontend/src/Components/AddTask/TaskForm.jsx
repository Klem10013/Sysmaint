import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, FloatingLabel, FormControl, Container, Row, DropdownButton, Dropdown} from 'react-bootstrap';
import {useCookies} from "react-cookie";


const UserForm = ({onAddProduct}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [time_duration, setTime_duration] = useState(5)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const [cookiesM, setCookieM, removeCookieM] = useCookies(['machine'])
    const [time_bet, setTime_bet] = useState(1)
    const [last_check, setLast_check] = useState(new Date())
    const [showDropdown, setShowDropdown] = useState(false);

    const All_machines = []
    for (let i = 0;i<cookiesM["machine"].length;i++)
    {

        All_machines.push(cookiesM["machine"][i].name)
    }
    const [machine_link_id , setMachine_link_id] = useState(All_machines[0]);


    const handleMachineSelect = (selectedCategory) => {
        setMachine_link_id(selectedCategory);
        setShowDropdown(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: cookies.user.name,
            company: cookies.user.id_company,
            token: cookies.user.token
        }
        console.log(All_machines)
        fetch("http://localhost:3001/task/add", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                name: user.username,
                token: user.token,
                id_company: user.company,

                task_name: name,
                description: ((description==='')&&("No description "))+description ,
                time_bet: time_bet,
                time_duration : time_duration,
                machine_link_id : machine_link_id

            })
        }).then((response) => {
            if (response.ok) {
                setName('');
                setDescription('');
                setTime_duration(5)
                setMachine_link_id("")
                setTime_bet(1)
                setLast_check(new Date())
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
                    <Form.Group className="mb-3" controlId="Task name">
                        <Form.Label>Name</Form.Label>
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
                    <Form.Group className="mb-3" controlId="Time_bet">
                        <Form.Label>Time between each repetition in day</Form.Label>
                        <Form.Control
                            type="number"
                            step="1"
                            value={time_bet}
                            onChange={(e) => setTime_bet(e.target.value)}

                            min={1}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Time_bet">
                        <Form.Label>The duration of the task in minutes</Form.Label>
                        <Form.Control
                            type="number"
                            step="10"
                            value={time_duration}
                            onChange={(e) => setTime_duration(e.target.value)}

                            min={5}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label className="custom-form-label">Machine link</Form.Label>
                        <DropdownButton
                            className={"custom-dropdown-btn"}
                            style={{padding:0}}
                            alignRight
                            title={All_machines[0]}
                            id="dropdown-menu-align-right"
                            required
                            onSelect={(selectedCategory) => handleMachineSelect(selectedCategory)}
                        >
                            {All_machines.map((cat) => (
                                <Dropdown.Item key={cat} eventKey={cat}>
                                    {cat}
                                </Dropdown.Item>
                            ))}

                        </DropdownButton>

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