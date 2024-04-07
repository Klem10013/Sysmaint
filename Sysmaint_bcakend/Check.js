const ErrHand = require("./Error_handel");
const dml = require("./Data/Manage_data");
const debug = require("./Debug");

async function Can_User_do(user,privilege_min)
{
    debug.debug("User privilege ask at level : " + privilege_min)
    if (user === undefined)
    {
        return ErrHand.ACTION_ERROR;
    }
    const status_connect = await dml.is_connected(user);
    const Err_connect = ErrHand.check_error(status_connect);
    if (!Err_connect[0])
    {
        return status_connect;
    }
    if (privilege_min === undefined)
    {
        return ErrHand.PRIVILEGE_ERR;
    }
    if (user.name === undefined || user.id_company === undefined || user.token === undefined) {
        return ErrHand.USER_DATA_MISSING;
    }
    const status = await dml.what_privilege(user)
    const Err = ErrHand.check_error(status)
    if (!Err[0]) {
        return Err[1];
    }
    if (Err[1] === ErrHand.PRIVILEGE_ERR || !(Err[1] <= privilege_min)) {

        return ErrHand.PRIVILEGE_NOT_HIGH_ENOUGH;
    }
    else
    {
        return ErrHand.PRIVILEGE_HIGH_ENOUGH;
    }
}

async function Req_check_user_privilege(req,privilege_min)
{
    const user_c =
        {
            name: req.body.name,
            id_company: req.body.id_company,
            token: req.body.token,
        }
        return await Can_User_do(user_c,privilege_min)
}

module.exports.Can_User_do = Can_User_do;
module.exports.Req_check_user_privilege = Req_check_user_privilege