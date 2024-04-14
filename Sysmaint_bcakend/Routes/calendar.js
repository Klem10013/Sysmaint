const express = require("express");
const dml = require("../Data/Manage_data");
const check = require("../Check");

const {user_connected} = require("../app")
const ErrHand = require("../Error_handel");
const debug = require("../Debug");

const router = express.Router();

router.post("/get", async (req, res, _next) => {
    debug.debug("Calendar creation Start");

    const status = await check.Req_check_user_privilege(req, ErrHand.WORKER)
    const Err = ErrHand.check_error(status)
    if (!Err[0]) {
        res.status(400).send(Err[1])
        return;
    }
    debug.debug(Err[1]);

    if (req.body.id_company === undefined )
    {
        debug.debug("Calendar creation aboard")
        res.status(400).send("New task information needed");
        return;
    }
    const Cal = await dml.create_calendar(req.body.id_company);
    const status2 = await check.Req_check_user_privilege(req, ErrHand.MANGER)
    const Err2 = ErrHand.check_error(status)
    if (Err2[0]) {
        res.status(400).send(Cal)
        return;
    }

    const Cal2 = await dml.get_calendar(req.body.id_company)
    res.send(Cal2)
})








module.exports = router;