import React from "react";
import {Cookies, useCookies} from "react-cookie";
import Navbar from "../Common/NavBar";
import UserHomePageBody from "./UserHomePageBody";
import {useNavigate} from "react-router-dom";


function UserHomaPage() {


    return (<>
        <div>
            <Navbar name={"SysMaint"} links={[{name: "Home", url: "/"},
                {name: "Add User", url: "/add_user_page"},
                {name: "Add Machine", url: "/add_machine_page"},
                {name: "Add Task", url: "/add_task_page"}]}/>
            <UserHomePageBody/>
        </div>
    </>)
}


export default UserHomaPage