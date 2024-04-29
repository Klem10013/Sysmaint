import React from "react";
import {Cookies, useCookies} from "react-cookie";
import Navbar from "../LoginPage/NavBar";
import UserHomePageBody from "./UserHomePageBody";
import {useNavigate} from "react-router-dom";


function UserHomaPage()
{


    return (<>
        <div>
            <Navbar name={"SysMaint"}/>
            <UserHomePageBody/>
        </div>
    </>)
}


export default UserHomaPage