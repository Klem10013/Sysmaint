import React, {useState} from "react";
import {Cookies, useCookies} from "react-cookie";
//import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";


function LoginPageBody() {
    const history = useNavigate();


    const redirectToHomePageUser = () => {
        history('/user_page'); // Redirects to the '/login' route
    };


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    //const navigation = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();

        // Perform login logic here, e.g., authenticate user
        // For simplicity, let's just redirect to a home page
        fetch("http://localhost:3001/client/connect", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name: username, pwd: password, id_company: company })
        }).then((response) => {
            // Check if response status is OK (200)
            if (response.ok) {
                // If the response is successful, parse the JSON data
                return response.json();
            } else {
                // If there's an error, throw an error with the status text
                console.log(response)
                throw new Error('Network response was not ok.');
            }
        }).then((data) => {
            // Handle the parsed data
            setCookie("user",data);
            console.log(data);
            redirectToHomePageUser();
        }).catch((error) => {
            // Handle any errors
            console.error('There was a problem with the fetch operation:', error);
        });
    };
    const rounded = "rounded"
    const light_background = "light_background"
    const container = "container mt-5"
    return (<>
        <div className="darker_background" style={{width: "100%", height: "100vh", margin: 0}}>
            <div className={`${container} ${rounded} ${light_background}`} style={{width: "300px"}}>
                <div className={container} style={{marginBottom: "50px"}}>
                    <h1>Login page</h1>
                </div>

                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formCompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Company id"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>


                    <Button variant="primary" type="submit" style={{marginTop: "20px"}}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    </>)
}

export default LoginPageBody;