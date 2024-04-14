const express = require("express");
const dml = require("../Data/Manage_data");
const check = require("../Check");

const {user_connected} = require("../app")
const ErrHand = require("../Error_handel");
const debug = require("../Debug");

const router = express.Router();

router.post("/get", async (req, res, _next) => {
    debug.debug("Task creation Start");

    const status = await check.Req_check_user_privilege(req, ErrHand.WORKER)
    const Err = ErrHand.check_error(status)
    if (!Err[0]) {
        res.status(400).send(Err[1])
        return;
    }
})








module.exports = router;