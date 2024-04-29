import React from 'react';
import NavBar from "./NavBar";
import HomePageBody from "./HomePageBody";

function HomePage() {
    return (<>
        <div>
            <NavBar name={"SysMaint"}/>
            <HomePageBody/>
        </div>
    </>);

}

export default HomePage;