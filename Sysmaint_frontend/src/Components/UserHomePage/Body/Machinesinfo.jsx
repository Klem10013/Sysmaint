import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container, Row} from "react-bootstrap";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Calendar.css"
import PopUptask from "./PopUptask";





function Machinesinfo() {
    const [machines, setMachines] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [cookiesM, setCookieM, removeCookieM] = useCookies(['machine'])
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const handleClickTask = (task) =>
    {
        setSelectedProduct(task);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    };



    const user = {
        name: cookies.user.name,
        token: cookies.user.token,
        company: cookies.user.id_company
    }


    useEffect(() => {
        fetch("http://localhost:3001/machines/get", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name: user.name, token: user.token, id_company: user.company})
        }).then(r => {
            if (r.ok) {
                r.json().then((data) => {
                    setCookieM("machine",data.message)
                    setMachines(data.message)
                    console.log(data.message)
                })
            } else {
                r.json().then((data) => {
                    console.log(data)
                })
            }
        })
    }, [])

    return (<>
        <Container>
            <Row style={{border: "2px solid #ccc"}}>
                <div key={"title_hours"} className="header">Machines information</div>
                <div className={"container"} style={{position: "relative"}}>
                    <div style={{paddingTop: 20, position: "relative", left: "auto", textAlign: "left", fontSize: 13}}>
                        {machines.map((machine) => {

                            return <Row key={machine.name} style={{margin: 5}}>
                                <div style={{border: "2px solid #cee"}}>
                                    <p style={{marginBottom: 3}}><b>Machine name :</b> {machine.name}</p>
                                    <p style={{marginBottom: 3}}><b>Machine description :</b> {machine.description}</p>
                                    <p><b>Machine distance :</b> {machine.distance}</p>
                                    <div>
                                        <h6 style={{}}>Machine tasks</h6>
                                        {machine.tasks.map((task) => {
                                            return (<Row key={task.name} style={{margin: 5}}>
                                                <div onClick={() => handleClickTask(task)}  style={{background: "#DFF5FF", border: "1px solid #007bff"}}>
                                                    <p style={{paddingLeft: 30, marginBottom: 3}}><b>Task name
                                                        : </b>{task.name}</p>
                                                </div>
                                            </Row>)
                                        })}
                                    </div>
                                </div>
                            </Row>
                        })
                        }
                    </div>
                </div>
            </Row>
            {showPopup && (
                <PopUptask product={selectedProduct} onHide={handleClosePopup} />
            )}

        </Container>
    </>)
}


export default Machinesinfo;