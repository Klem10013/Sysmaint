import React,  { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, FloatingLabel, FormControl } from 'react-bootstrap';
import Navbar from "../Common/NavBar";
import UserHomePageBody from "../UserHomePage/UserHomePageBody";
import AddUserPageBody from "./AddUserPageBody";


const AddUserPage = () => {
    return (<>
        <div>
            <Navbar name={"SysMaint"} links={[{name: "Home", url: "/"},
                {name: "User Page", url: "/user_page"},
                {name: "Add Machine", url: "/add_machine_page"},
                {name: "Add Task", url: "/add_task_page"}]}/>
            <AddUserPageBody/>
        </div>
    </>)
};

export default AddUserPage