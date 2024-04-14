const WRONG_MACHINE = -17;
const PRIVILEGE_HIGH_ENOUGH = -16;
const PRIVILEGE_NOT_HIGH_ENOUGH = -15;
const USER_DATA_MISSING = -14;
const USER_ALREADY_CONNECTED = -13;
const USER_EXIST = -12;
const USER_IS_NOT_CONNECTED = -11;
const USER_IS_CONNECTED = -10;
const USER_PWD_IS_WRONG = -9
const USER_PWD_IS_GOOD = -8;
const USER_NOT_EXISTING = -7;
const ACTION_GOOD = -6;
const ACTION_ERROR = -5;
const EXISTING_COMPANY = -4;
const WRONG_COMPANY = -3;
const NOT_CONNECTED = -2;
const PRIVILEGE_ERR = -1;
const OWNER = 1;
const MANGER = 2;
const WORKER = 3;

module.exports = {
    WRONG_COMPANY,
    PRIVILEGE_ERR,
    OWNER,
    MANGER,
    WORKER,
    NOT_CONNECTED,
    EXISTING_COMPANY,
    ACTION_ERROR,
    ACTION_GOOD,
    USER_NOT_EXISTING,
    USER_PWD_IS_GOOD,
    USER_PWD_IS_WRONG,
    USER_IS_CONNECTED,
    USER_IS_NOT_CONNECTED,
    USER_EXIST,
    USER_ALREADY_CONNECTED,
    USER_DATA_MISSING,
    PRIVILEGE_NOT_HIGH_ENOUGH,
    PRIVILEGE_HIGH_ENOUGH,
    WRONG_MACHINE,
};

const debug = require("./Debug");

//this function will take the result of an error and
//will return the correct message according to the error
//And if the test pass or not like this
//(bool // is good or not,string // the message that describe the error

function check_error(message) {
    if (typeof (message) !== typeof (-1)) {
        return [true, message];
    } else if (message === OWNER) {
        return [true, message]
    } else if (message === MANGER) {
        return [true, message]
    } else if (message === WORKER) {
        return [true, message]
    } else if (message === WRONG_COMPANY) {
        debug.debug("WRONG_COMPANY")
        return [false, "User use a wrong company"];
    } else if (message === NOT_CONNECTED) {
        debug.debug("NOT_CONNECTED")
        return [false, "User is not connected"];
    } else if (message === PRIVILEGE_ERR) {
        debug.debug("PRIVILEGE_ERR")
        return [false, "User PRIVILEGE are not high enough"];
    } else if (message === EXISTING_COMPANY) {
        debug.debug("EXISTING_COMPANY")
        return [false, "Company already exist"];
    } else if (message === ACTION_ERROR) {
        debug.debug("ACTION_ERROR")
        return [false, "Something went wrong"];
    } else if (message === ACTION_GOOD) {
        debug.debug("ACTION_GOOD")
        return [true, "Everything is good"];
    } else if (message === USER_NOT_EXISTING) {
        debug.debug("USER_NOT_EXISTING")
        return [false, "User Not Existing"];
    } else if (message === USER_PWD_IS_GOOD) {
        debug.debug("USER_PWD_IS_GOOD")
        return [true, "User pwd is good"];
    } else if (message === USER_PWD_IS_WRONG) {
        debug.debug("USER_PWD_IS_WRONG")
        return [false, "User pwd is wrong"];
    } else if (message === USER_IS_CONNECTED) {
        debug.debug("USER_IS_CONNECTED")
        return [true, "User is connected"]
    } else if (message === USER_IS_NOT_CONNECTED) {
        debug.debug("USER_IS_NOT_CONNECTED");
        return [false, "User is not connected"];
    } else if (message === USER_EXIST) {
        debug.debug("USER_EXIST");
        return [true, "User Exist"];
    } else if (message === USER_ALREADY_CONNECTED) {
        debug.debug("USER_ALREADY_CONNECTED")
        return [false, "User is Already connected"];
    } else if (message === USER_DATA_MISSING) {
        debug.debug("USER_DATA_MISSING");
        return [false, "User data is missing"];
    } else if (message === PRIVILEGE_NOT_HIGH_ENOUGH) {
        debug.debug("PRIVILEGE_NOT_HIGH_ENOUGH");
        return [false, "User PRIVILEGE are not high enough"]
    } else if (message === PRIVILEGE_HIGH_ENOUGH) {
        debug.debug("PRIVILEGE_HIGH_ENOUGH");
        return [true, "User PRIVILEGE are high enough"]
    } else if (message === WRONG_MACHINE) {
        debug.debug("WRONG_MACHINE");
        return [false, "User try to use a wrong machine"]
    }
}

module.exports.check_error = check_error;
