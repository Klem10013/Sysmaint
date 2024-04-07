const fs = require('node:fs');
const path = require("path");
const {user_connected} = require("../app");
const ErrHand = require("../Error_handel");
const debug = require("../Debug");


const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "Data");

const MACHINES = "machines.json";
const EMPLOYEE = "employee.json"
const TASK = "task.json";


//#########################################################################
//Company creation function
//#########################################################################
async function create_company(company_name, owner) {

    const company_path = path.join(dataPath, company_name);
    if (fs.existsSync(company_path)) {
        return ErrHand.EXISTING_COMPANY;
    }


    //try to create the company
    try {
        await fs.mkdirSync(company_path);

        await write_file(company_path, EMPLOYEE);
        await write_file(company_path, MACHINES);
        await write_file(company_path, TASK);

        const status = await create_user(company_name, owner);
        const Err = ErrHand.check_error(status)
        if (Err[0]) {
            return owner;
        } else {
            return status;
        }
    } catch (e) {
        debug.debug("Error = " + e);
        return ErrHand.ACTION_ERROR;
    }
}


//#########################################################################
//User creation function
//#########################################################################
async function create_user(company_id, user) {
    debug.debug("User Creation")
    debug.debug("company_id = " + company_id);
    return await add_data(company_id, EMPLOYEE, user);
}


//#########################################################################
//Machine creation function
//#########################################################################
async function create_machine(machine,user)
{
    debug.debug("Machine Creation")
    debug.debug("company_id = " + user.id_company);
    return await add_data(user.id_company, MACHINES, machine);
}

//#########################################################################
//Write and read function
//#########################################################################
async function readDataRout(entityName) {
    const path_company = path.join(dataPath, entityName)
    if (fs.existsSync(path_company)) {

        const rawFileContent = await fs.promises.readFile(path_company)
        if (rawFileContent === undefined) {
            return undefined;
        }
        debug.debug("File find")
        return JSON.parse(rawFileContent.toString());
    } else {
        debug.debug("File not found")
        return undefined;
    }


}

async function saveDataRoutines(entityName, items) {
    fs.writeFileSync(path.join(dataPath, entityName), JSON.stringify(items))
    return ErrHand.ACTION_GOOD;
}


async function add_data(company_id,filename,data)
{
    const company_path = path.join(dataPath,company_id)
    if (!fs.existsSync(company_path)) {
        return ErrHand.WRONG_COMPANY;
    }

    // add data to the company
    const olderData = await readDataRout(path.join(company_id, filename));
    if (olderData === undefined) {
        return ErrHand.WRONG_COMPANY;
    }
    let i = 1;
    let name = data.name;
    while (olderData.find((old_data) => old_data.name === name) !== undefined) {
        name = data.name + i.toString();
        i += 1;
    }
    data.name = name;
    const allData = [data, ...olderData];
    await write_file(company_path, filename, JSON.stringify(allData))
    return ErrHand.ACTION_GOOD
}

async function write_file(path_file, filename, data) {
    if (data === undefined) {
        fs.writeFileSync(path.join(path_file, filename), "[]");
        debug.debug("Create " + filename);
    } else {
        fs.writeFileSync(path.join(path_file, filename), data);
        debug.debug("Write " + filename);
    }
}


//#########################################################################
//All check function (need to be moved to the check.js file )
//#########################################################################


//return 0 if the User does not Exist
//return 1 if the User is can be connected
//return 2 if the User pwd is wrong
async function check_pwd(user) {
    const User_connected = user_connected.find((user_c) => (user_c.name === user.name && user_c.id_company === user.id_company));
    debug.debug("User connection = " + User_connected);
    if (User_connected !== undefined) {
        return ErrHand.USER_ALREADY_CONNECTED;
    }
    const All_user_company = await readDataRout(path.join(user.id_company, EMPLOYEE));
    if (All_user_company === undefined) {
        return ErrHand.WRONG_COMPANY;
    }
    const User_check = All_user_company.find((user_c) => (user_c.name === user.name));

    if (User_check === undefined) {
        debug.debug("User not Existing");
        return ErrHand.USER_NOT_EXISTING;
    }
    if (User_check.pwd === user.pwd) {
        debug.debug("User is now connected");
        return ErrHand.USER_PWD_IS_GOOD;
    }
    debug.debug(" User pws is wrong");
    return ErrHand.USER_PWD_IS_WRONG;
}


async function User_Exist(user) {
    if (user.name === undefined || user.id_company === undefined)
    {
        return ErrHand.USER_DATA_MISSING;
    }
    const All_user_company = await readDataRout(path.join(user.id_company, EMPLOYEE));
    if (All_user_company === undefined) {
        return ErrHand.WRONG_COMPANY;
    }
    const User_check = All_user_company.find((user_c) => (user_c.name === user.name));
    if (User_check === undefined) {
        return ErrHand.USER_NOT_EXISTING;
    }
    return ErrHand.USER_EXIST;
}

async function is_connected(user) {
    if (user.name === undefined || user.id_company === undefined)
    {
        return ErrHand.USER_DATA_MISSING;
    }
    const status = await User_Exist(user);
    const Err = ErrHand.check_error(status);
    if (!Err[0]) {
        return status;
    }
    const User_check = user_connected.find((user_c) => (user_c.name === user.name && user_c.id_company === user.id_company));
    if (User_check === undefined) {
        debug.debug("User not connected");
        return ErrHand.USER_IS_NOT_CONNECTED;
    } else if (user.token === User_check.token) {
        debug.debug("User already log");
        return ErrHand.USER_IS_CONNECTED;
    } else {
        debug.debug("User not log");
        return ErrHand.USER_IS_NOT_CONNECTED;
    }
}


async function what_privilege(user) {
    if (user.name === undefined || user.id_company === undefined)
    {
        return ErrHand.USER_DATA_MISSING;
    }
    const status = await is_connected(user)
    const Err = ErrHand.check_error(status);
    if (Err[0]) {
        const All_user_company = await readDataRout(path.join(user.id_company, EMPLOYEE));
        if (All_user_company === undefined) {
            return ErrHand.WRONG_COMPANY;
        }

        const User_check = All_user_company.find((user_c) => (user_c.name === user.name));

        if (User_check === undefined) {
            return ErrHand.USER_NOT_EXISTING;
        } else {
            return User_check.privilege;
        }
    } else {
        return status;
    }
}


async function readClient(company) {
    return await readDataRout(path.join(company, EMPLOYEE));
}

async function readMachines(company) {
    return await readDataRout(MACHINES, company);
}


async function saveClient(client, company) {
    return await saveDataRoutines(client, company);
}

async function saveMachine(machine, company) {
    return await saveDataRoutines(MACHINES, machine, company);
}


module.exports.readClient = readClient;
module.exports.readMachines = readMachines;
module.exports.saveClient = saveClient;
module.exports.saveMachine = saveMachine;
module.exports.check_pwd = check_pwd;
module.exports.is_connected = is_connected;
module.exports.what_privilege = what_privilege;
module.exports.create_user = create_user;
module.exports.createCompany = create_company;
module.exports.create_machine = create_machine;