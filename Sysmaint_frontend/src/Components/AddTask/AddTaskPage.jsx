import React from "react";
import Navbar from "../Common/NavBar";
import AddTaskPageBody from "./AddTaskPageBody";


function AddTaskPage(){
    return (<>
        <div>
            <Navbar name={"SysMaint"} links={[{name: "Home", url: "/"},
                {name: "Add User", url: "/add_user_page"},
                {name: "Add Machine", url: "/add_machine_page"},
                {name: "User Page", url: "/user_page"},]}/>
            <AddTaskPageBody/>
        </div>
    </>)
}

export default AddTaskPage