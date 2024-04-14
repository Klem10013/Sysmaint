const express = require("express");
const dml = require("../Data/Manage_data");
const check = require("../Check");

const {user_connected} = require("../app")
const ErrHand = require("../Error_handel");
const debug = require("../Debug");

const router = express.Router();


router.post("/add", async (req, res, _next) => {
    debug.debug("Task creation Start");

    const status = await check.Req_check_user_privilege(req, ErrHand.MANGER)
    const Err = ErrHand.check_error(status)
    if (!Err[0]) {
        res.status(400).send(Err[1])
        return;
    }
    debug.debug(Err[1]);

    if (req.body.task_name === undefined || req.body.time_bet === undefined || req.body.machine_link_id === undefined)
    {
        debug.debug("task creation aboard")
        res.status(400).send("New task information needed");
        return;
    }
    if (req.body.description === undefined)
    {
        req.body.description = "No description";
    }
    if (req.body.time_duration === undefined)
    {
        req.body.time_duration = 60;
    }
    if (req.body.last_check === undefined)
    {
        req.body.last_check = new Date()
    }
    else
    {

        const data = req.body.last_check
        if (typeof(data) !== typeof(""))
        {
            debug.debug("task creation aboard")
            res.status(400).send("task date is wrong");
            return;
        }
        const date = new Date(req.body.last_check)
        if (isNaN(date.valueOf()))
        {
            debug.debug("task creation aboard")
            res.status(400).send("task date is wrong");
            return;
        }
        req.body.last_check = date
    }

    try {
        const task = {
            name : req.body.task_name,
            description : req.body.description,
            time_duration : req.body.time_duration,
            machine_link_id : req.body.machine_link_id,
            status : ErrHand.FREE,
            time_bet : req.body.time_bet,
            last_check : req.body.last_check
        }

        const user = {

            name: req.body.name,
            id_company: req.body.id_company,
        }
        const status = await dml.create_task(task, user);
        const Err = ErrHand.check_error(status);
        if (Err[0]) {
            res.status(200).json(JSON.stringify(Err[1]));
        } else {
            res.status(400).send(Err[1]);
        }
    }catch (e) {
        debug.debug("Error = " + e);
        res.status(400).send("Error")
    }




});





module.exports = router;