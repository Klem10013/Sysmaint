import React from 'react';
import Navbar from "./NavBar"
import LoginPageBody from "./LoginPageBody";

function LoginPage() {

    return (
        <div>
            <Navbar name={"SysMaint"}/>
            <LoginPageBody/>
        </div>
    );
}

export default LoginPage;