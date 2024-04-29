import React from "react";

function TopPart()
{   return (
    <>
        <div className="dark_background">
        </div>
        <div className="row">
            <div className="darker_background" style={{margin:0 , padding:0}}>
                <div className="col-0 text-center mt-0">
                    <div className="image-div">
                        <img src={require("../../../image/Usine.png")} className="img-fluid" alt="Your Image"/>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default TopPart;