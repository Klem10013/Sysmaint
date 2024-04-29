import React from "react";
import CardPart from "./CardPart";
import ImageCard from "./ImageCard";

function DescriptionPart(tbProp) {
    return (
        <>
            <div className="row">
                    {tbProp.textRight && <CardPart colorgradian={false} text={"Introducing SysMaint, the revolutionary solution for maintenance management. With an\n" +
                        "                                intuitive interface, asset management, work order system, preventive maintenance\n" +
                        "                                scheduling, and robust reporting, SysMaint simplifies maintenance operations. Accessible\n" +
                        "                                from any device via its cloud-based platform, it enhances efficiency, reduces downtime,\n" +
                        "                                saves costs, and ensures compliance with regulatory standards. Real-life examples\n" +
                        "                                include a 20% increase in uptime and a 15% cost reduction in manufacturing, streamlined\n" +
                        "                                operations and improved guest satisfaction in hospitality, and compliance assurance in\n" +
                        "                                healthcare. Ready to experience the future of maintenance management? Visit our website\n" +
                        "                                for a demo or contact us to learn more!"}/>}
                    {!tbProp.textRight && <ImageCard/>}
                    {!tbProp.textRight && <CardPart colorgradian={true} text={"SysMaint isn't just a solution; it's a game-changer in maintenance management. With its intuitive interface, robust features for asset management, efficient work order system, and proactive preventive maintenance scheduling, SysMaint simplifies complex operations. Accessible from any device via its cloud-based platform, SysMaint doesn't just enhance efficiency—it transforms the way organizations operate. Imagine a future with minimized downtime, optimized costs, and seamless compliance with regulatory standards. Real-world success stories speak volumes: a 20% increase in uptime and a significant 15% reduction in manufacturing costs. In hospitality, operations are streamlined, and guest satisfaction soars. In healthcare, compliance assurance is guaranteed. SysMaint isn't just about managing maintenance; it's about unlocking the potential for organizational excellence. Ready to experience the future of maintenance management? Dive into a live demo on our website or contact us to embark on this transformative journey!"}/>}
                    {tbProp.textRight && <ImageCard/>}
            </div>
        </>
    );
}

export default DescriptionPart;