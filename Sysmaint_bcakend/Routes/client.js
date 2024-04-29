const express = require("express");
const dml = require("../Data/Manage_data");
const uuidv4 = require("uuid");

const {user_connected} = require("../app")
const ErrHand = require("../Error_handel");
const debug = require("../Debug");
const check = require("../Check")

const router = express.Router();

function create_mdp(_len) {
    return uuidv4.v4();
}


router.post("/add", async (req, res, _next) => {
        debug.debug("User creation start");
        const status = await check.Req_check_user_privilege(req,ErrHand.MANGER)
        const Err = ErrHand.check_error(status)
        if (!Err[0])
        {
            res.status(ErrHand.return_status(Err)).json(ErrHand.return_error(Err))
            return;
        }
        debug.debug(Err[1]);


        if (req.body.name_add === undefined || req.body.address_add === undefined || req.body.privilege_add === undefined || req.body.id_company_add === undefined) {
            res.status(400).send("New user information needed");
            debug.debug("User Creation aboard");
            return;
        }
        if (req.body.privilege_add <= ErrHand.OWNER) {
            res.status(400).send("User privilege are not possible")
            debug.debug("User creation aboard")
            return;
        }
        if (req.body.id_company_add !== req.body.id_company)
        {
            res.status(400).send("User has not the permission to add in this company")
            debug.debug("User creation aboard")
            return;
        }


        try {
            const user = {
                name: req.body.name_add,
                address: req.body.address_add,
                privilege: req.body.privilege_add,
                start : 8.5*60,
                end : 18*60,
                break_p : 5,
                pwd: create_mdp(1),
            };
            const status = await dml.create_user(req.body.id_company_add, user);
            const Err = ErrHand.check_error(status)
            if (Err[0]){
                debug.debug("Client Created" + JSON.stringify(user));
                res.status(ErrHand.return_status(Err)).json(ErrHand.return_error(Err))
            } else {
                res.status(ErrHand.return_status(Err)).json(ErrHand.return_error(Err))
            }
        } catch (e) {
            debug.debug("Error" + e);
            res.status(400).send(e);

        }

    }
);

router.post("/connect", async (req, res, _next) => {
    debug.debug("Logging asked");
    if (req.body.name === undefined || req.body.id_company === undefined || req.body.pwd === undefined) {

        res.status(400).json({"Error ": "information insufficient"});
        return;
    }
    const user =
        {
            name: req.body.name,
            id_company: req.body.id_company,
            pwd: req.body.pwd,
        }
    const status = await dml.check_pwd(user);
    const Err = ErrHand.check_error(status)
    if (Err[0]) {
        const user_connect =
            {
                name: req.body.name,
                id_company: req.body.id_company,
                token: uuidv4.v4(),

            };

        user_connected.push(user_connect);
        debug.debug("user connected = " + user_connected);
        res.json(JSON.stringify(user_connect));

    } else {
        if (status === ErrHand.USER_ALREADY_CONNECTED)
        {
            const user_connect =
                {
                    name: req.body.name,
                    id_company: req.body.id_company,
                    token: user_connected.find((user) => user.name === req.body.name).token

                };
            debug.debug(user_connect)
            res.json(JSON.stringify(user_connect));
            return;
        }
        res.status(400).json({"Error" : Err[1]});
    }
});


router.post("/list_company", async (req, res, _next) => {
    debug.debug("List of employee ask");
    if (req.body.id_company === undefined) {
        debug.debug("List of employee ask not given");
        res.status(400).send("Company id require")
        return;
    }
    if (req.body.name === undefined || req.body.token === undefined) {
        debug.debug("List of employee ask not given");
        res.status(400).send("information insufficient");
        return;
    }
    const user =
        {
            name: req.body.name,
            id_company: req.body.id_company,
            token: req.body.token,
        }
    debug.debug("List of All employee of " + req.body.id_company + " is ask")
    const status = await dml.is_connected(user)
    const Err = ErrHand.check_error(status);
    if (Err[0]) {
        const All_user = await dml.readClient(user.id_company);
        res.status(200).json(JSON.stringify(All_user));
    } else {
        res.status(ErrHand.return_status(Err)).json(ErrHand.return_error(Err))
    }
});

module.exports = router;