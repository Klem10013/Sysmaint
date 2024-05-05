import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container, Row} from "react-bootstrap";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";





function Userinfo() {
    const [users, setUsers] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const history = useNavigate();


    const user = {
        name: cookies.user.name,
        token: cookies.user.token,
        company: cookies.user.id_company
    }

    const redirectToLogPage = () => {
        history('/login'); // Redirects to the '/login' route
    };

    useEffect(() => {
        fetch("http://localhost:3001/client/get", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name: user.name, token: user.token, id_company: user.company})
        }).then(r => {
            if (r.ok) {
                r.json().then((data) => {
                    setUsers(data.message)
                    console.log(data.message)
                })
            } else {
                r.json().then(() => {
                    redirectToLogPage()
                })
            }
        })
    }, [])

    return (<>
        <Container>
            <Row style={{border: "2px solid #ccc"}}>
                <div key={"title_hours"} className="header">User information</div>
                <div className={"container"} style={{position: "relative"}}>
                    <div style={{paddingTop: 20, position: "relative", left: "auto", textAlign: "left", fontSize: 13}}>
                        {users.map((user) => {

                            return <Row key={user.name} style={{margin: 5}}>
                                <div style={{border: "2px solid #cee"}}>
                                    <p style={{marginBottom: 3}}><b>User name :</b> {user.name}</p>
                                    <p style={{marginBottom: 3}}><b>User privilege :</b> {user.privilege}</p>
                                    {user.pwd !== undefined && <p style={{marginBottom: 3}}><b>User password :</b> {user.pwd}</p>}
                                </div>
                            </Row>
                        })
                        }
                    </div>
                </div>
            </Row>
        </Container>
    </>)
}


export default Userinfo;