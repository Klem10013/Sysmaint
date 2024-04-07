const express = require("express");
const _uuidv4 = require("uuid")
const ErrHand = require("../Error_handel");

const dml = require("../Data/Manage_data");

const router = express.Router();


function create_mdp(len)
{
    return _uuidv4.v4();
}


router.post("/create_company", async (req,res,_next) =>
{
    console.log("File company.js | Function create_company | Company_creation_request");
    if (req.body.name === undefined || req.body.id_company === undefined)
    {
        res.status(400).send("name and company name needed");
        console.log("File company.js | Function create_company | Company_creation_aboard");
        return;
    }
    const owner = {
        user_name : req.body.user_name,
        name : req.body.name,
        address : req.body.address,
        privilege : 1,
        pwd : create_mdp(1),
    };
    try {
        const status = await dml.createCompany(req.body.id_company, owner);
        const Err = ErrHand.check_error(status);
        if (Err[0]) {
            console.log("File company.js | Function create_company | Company_created");
            res.status(200).send(Err[1].toString());
        }
        else
        {
            console.log("File company.js | Function create_company | Company_creation_aboard");
            res.status(400).send(Err[1].toString());
        }
    }
    catch (e)
    {
        console.log("File company.js | Function create_company | Company_creation_aboard");
        res.status(400).send(e.toString());
    }
});

module.exports = router;