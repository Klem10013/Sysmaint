import React from "react";
import Navbar from "../Common/NavBar";
import AddMachinePageBody from "./AddMachinePageBody";


function AddMachinePage(){
    return (<>
        <div>
            <Navbar name={"SysMaint"} links={[{name: "Home", url: "/"},
                {name: "Add User", url: "/add_user_page"},
                {name: "User Page", url: "/user_page"},
                {name: "Add Task", url: "/add_task_page"}]}/>
            <AddMachinePageBody/>
        </div>
    </>)
}

export default AddMachinePage