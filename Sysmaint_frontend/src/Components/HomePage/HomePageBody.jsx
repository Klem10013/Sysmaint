import React from "react";
import TopPart from "./Body/TopPart";
import DescriptionPart from "./Body/DescriptionPart";


function HomePageBody(){
    return (
        <div>
            <TopPart/>
            <DescriptionPart textRight = {true}/>
            <div className="dark_background" style={{padding : 2}}/>
            <DescriptionPart textRight = {false}/>
        </div>
    );
}

export default HomePageBody;