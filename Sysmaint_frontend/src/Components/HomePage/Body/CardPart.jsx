import React from "react";

function CardPart(prop) {
    let name = "light_background"
    if (prop.colorgradian)
    {
        name = "light_background"
    }
    return (
        <>
            <div className="col-md-6" style={{padding: 0}}>
                <div className="bottom-div">
                    <div className={name} >
                            <p style={{ margin : "5%" , textAlign : "justify"}}>{prop.text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardPart;