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
const CALENDAR = "calendar.json"


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

        await write_file(company_path, CALENDAR);
        await write_file(company_path, EMPLOYEE);
        await write_file(company_path, MACHINES);
        await write_file(company_path, TASK);


        const status = await create_user(company_name, owner);
        const Err = ErrHand.check_error(status)
        if (Err[0]) {
            return JSON.stringify(owner);
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
//User get function
//#########################################################################
async function get_user(company_id,userc) {
    debug.debug("User get")
    debug.debug("company_id = " + company_id);
    const users = await readDataRout(path.join(company_id, EMPLOYEE));
    const users_clean = []
    for(let i = 0;i<users.length;i++)
    {
        let pwd = undefined;
        debug.debug("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG " + userc.privilege )
        if (users[i].privilege>=userc.privilege)
        {
            pwd = users[i].pwd
        }
        const user = {
            name : users[i].name,
            privilege : users[i].privilege,
            pwd : pwd
        }
        users_clean.push(user)
    }
    return users_clean
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
//Machine get function
//#########################################################################
async function get_machines(company_id)
{
    const machines = await readDataRout(path.join(company_id, MACHINES));
    const tasks = await readDataRout(path.join(company_id, TASK))
    for (let m = 0;m<machines.length;m++)
    {
        machines[m].tasks = []
        for (let i = 0;i<machines[m].all_id_task.length;i+=1)
        {
            machines[m].tasks.push(tasks.find((task) => (task.name === machines[m].all_id_task[i])))
        }
    }

    return machines
}



//#########################################################################
//Create Calender
//#########################################################################

async function create_calendar(company_id)
{
    debug.debug("Creation Company Start with company "+company_id );
    const All_employee = await readDataRout(path.join(company_id,EMPLOYEE));
    const All_Worker = await All_employee.filter((employee) => employee.privilege === ErrHand.WORKER);
    const All_machine = await readDataRout(path.join(company_id,MACHINES));
    const All_task = await readDataRout(path.join(company_id,TASK));
    debug.debug("All worker length : " + All_Worker.length);
    debug.debug("All machine length : " + All_machine.length);
    debug.debug("All task length : " + All_task.length);
    const today_Date_value = new Date().valueOf();


    const calendar = []
    for (let i = 0;i<All_Worker.length;i++)
    {
        const employee = All_Worker[i]
        const worker = {
            name : All_Worker[i].name,
            task_name : [],
            task_start : [],
            task_end : []
        }
        let Start_Time = employee.start
        let End_Time = 12*60;
        for (let j = 0; j < All_machine.length; j++) {




            const machine = All_machine[j]

            const drive = {
                "name": "Drive",
                "description": "Go to the machine",
                "time_duration": machine.distance,
            }
            const drive_back = {
                name: "Drive back",
                description: "Drive back from the machine",
                time_duration: machine.distance,
            }


            let Start_Time_machine = Start_Time + machine.distance;
            let Task_S = [Start_Time]
            let Task_E = [Start_Time_machine]
            let Task_N = [drive]
            Start_Time_machine += employee.break_p
            debug.debug("Machine distance = "+ employee.break_p);
            for (let k = 0; k < machine.all_id_task.length; k++) {
                const task = await All_task.find((task) => task.name === machine.all_id_task[k]);

                if (task.status === ErrHand.FREE) {

                    const Last_check = new Date(task.last_check).valueOf();
                    const Time_Sep = new Date(3600 * 24 * 1000 * task.time_bet);
                    const diff = (today_Date_value - Last_check) - Time_Sep;
                    if (diff > 0) {
                        debug.debug("Task name = "+ task.name+ " task duration " + (task.time_duration + Start_Time_machine))
                        if (task.time_duration + Start_Time_machine >= End_Time)
                        {

                            Start_Time_machine += 2*60
                            if (Task_S.length === 1)
                            {
                                Task_S = [Start_Time_machine]
                                Task_E = [Start_Time_machine+machine.distance]
                                Start_Time_machine += machine.distance+employee.break_p
                                Task_N = [drive]
                            }
                            End_Time = employee.end
                        }
                        if ((task.time_duration + Start_Time_machine) <= End_Time) {

                            Task_S.push(Start_Time_machine)
                            Task_E.push(Start_Time_machine+task.time_duration)
                            Task_N.push(task);
                            task.status = ErrHand.TAKEN;
                            Start_Time_machine = Start_Time_machine+task.time_duration+employee.break_p
                        }
                    }
                }
            }
            Task_S.push(Start_Time_machine)
            Task_E.push(Start_Time_machine+machine.distance)
            Task_N.push(drive_back);
            if (Task_S.length > 2) {
                worker.task_end = worker.task_end.concat(Task_E)
                worker.task_start = worker.task_start.concat(Task_S)
                worker.task_name = worker.task_name.concat(Task_N)
                Start_Time = Start_Time_machine+machine.distance ;
                Start_Time += employee.break_p
            }
        }
        calendar.push([worker])
    }
    await write_file(path.join(dataPath,company_id),CALENDAR,JSON.stringify(calendar));
    return JSON.stringify(calendar);
}


async function get_calendar(user)
{
    const All_calendar = await readDataRout(path.join(user.id_company,CALENDAR));
    return All_calendar.find((user_c)=> user_c.name === user.name)
}


//#########################################################################
//Task creation function
//#########################################################################
async function create_task(task,user)
{
    debug.debug("Task Creation")
    debug.debug("company_id = " + user.id_company);
    const All_Machine = await readDataRout(path.join(user.id_company, MACHINES));
    const Machine = All_Machine.findIndex((machine) => machine.name === task.machine_link_id)
    if (Machine === -1)
    {
        return ErrHand.WRONG_MACHINE;
    }
    return await add_data_task(user.id_company, TASK, task,All_Machine,Machine);
}

async function add_data_task(company_id,filename,data,All_Machine,ID)
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
    All_Machine[ID].all_id_task.push(data.name)
    const allData = [data, ...olderData];
    await write_file(company_path, filename, JSON.stringify(allData))
    await write_file(company_path,MACHINES,JSON.stringify(All_Machine))
    return data
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
module.exports.create_task = create_task;
module.exports.create_calendar = create_calendar;
module.exports.get_calendar = get_calendar;
module.exports.get_machines = get_machines;
module.exports.get_user = get_user;