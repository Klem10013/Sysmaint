const express = require("express");
const dml = require("../Data/Manage_data");
const check = require("../Check");

const {user_connected} = require("../app")
const ErrHand = require("../Error_handel");
const debug = require("../Debug");

const router = express.Router();

router.post("/get", async (req, res, _next) => {
    debug.debug("Calendar creation Start");
    const Response = {
        status : "",
        message : ""
    }
    debug.debug(JSON.stringify(req.body))
    const status = await check.Req_check_user_privilege(req, ErrHand.WORKER)
    const Err = ErrHand.check_error(status)
    if (!Err[0]) {
        res.status(400).send(Err[1])
        return;
    }
    debug.debug(Err[1]);

    if (req.body.id_company === undefined )
    {
        Response.status= "Error";
        Response.message = "New task information needed";
        debug.debug("Calendar creation aboard")
        res.status(400).json(Response);
        return;
    }
    const Cal = await dml.create_calendar(req.body.id_company);
    const status2 = await check.Req_check_user_privilege(req, ErrHand.MANGER)
    const Err2 = ErrHand.check_error(status2)
    if (Err2[0]) {
        Response.status= req.body.name;
        Response.message = Cal;
        res.status(200).json(Response)

        return;
    }
    debug.debug(req.body.name)
    const Cal2 = JSON.parse(Cal).find((cal) => (cal.name === req.body.name));
    Response.status= req.body.name;
    Response.message = Cal2;
    res.status(200).json(Response)
})








module.exports = router;