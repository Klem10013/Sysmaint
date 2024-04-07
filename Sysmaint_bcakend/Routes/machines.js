const express = require("express");
const dml = require("../Data/Manage_data");
const check = require("../Check");

const {user_connected} = require("../app")
const ErrHand = require("../Error_handel");
const debug = require("../Debug");

const router = express.Router();

router.post("/add", async (req, res, _next) => {
    debug.debug("Machine creation Start");

    const status = await check.Req_check_user_privilege(req, ErrHand.MANGER)
    const Err = ErrHand.check_error(status)
    if (!Err[0]) {
        res.status(400).send(Err[1])
        return;
    }
    debug.debug(Err[1]);

    if (req.body.machine_name === undefined || req.body.all_id_task === undefined) {
        debug.debug("Machine creation aboard")
        res.status(400).send("New machine information needed");
        return;
    }
    if (typeof(req.body.all_id_task) !== typeof([]))
    {
        debug.debug("Machine creation aboard")
        res.status(400).send("New machine information needed");
        return;
    }
    try {
        const machine = {
            name: req.body.machine_name ,
            description: req.body.description,
            distance: req.body.distance,
            all_id_task: req.body.all_id_task,
        };
        const user = {

            name: req.body.name,
            id_company: req.body.id_company,
        }
        const status = await dml.create_machine(machine,user);
        const Err = ErrHand.check_error(status);
        if (Err[0]) {
            res.status(200).json(JSON.stringify(Err[1]));
        } else {
            res.status(400).send(Err[1]);
        }

    } catch (e) {
        debug.debug("Error = " + e);
    }


});


module.exports = router;