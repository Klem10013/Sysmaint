import React from "react";
import {useCookies} from "react-cookie";
import {Container,Row} from "react-bootstrap";


function UserInformation() {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    return (<>
        <Container>
            <Row style={{border : "2px solid #ccc"}}>
                <div key={"title_hours"} className="header" >User information</div>
                <div className={"container"} style={{position: "relative"}}>
                    <div style={{paddingTop: 20, position: "relative", left: "auto", textAlign: "left", fontSize:13}}>
                        <p style={{marginBottom: 5}}><b>User Name :</b> {cookies.user.name}</p>
                        <p style={{marginBottom: 20}}><b>User Company :</b> {cookies.user.id_company}</p>
                    </div>
                </div>
            </Row>
        </Container>
    </>)

}

export default UserInformation