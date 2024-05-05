import React from 'react';
import Navbar from "../Common/NavBar"
import LoginPageBody from "./LoginPageBody";

function LoginPage() {

    return (
        <div>
            <Navbar name={"SysMaint"} links = {[{name: "Home", url: "/"}]}/>
            <LoginPageBody/>
        </div>
    );
}

export default LoginPage;