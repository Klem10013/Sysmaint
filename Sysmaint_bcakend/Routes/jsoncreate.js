const user = {
    name: undefined,
    address: undefined,
    privilege: undefined,
    mdp: undefined,
    token : undefined,
    name_add : undefined,
    address_add : undefined,
    id_company_add : undefined,
    privilege_add : undefined,

};
const machine = {
    machine_name : undefined,
    name : undefined,
    description : undefined,
    distance : undefined,
    all_id_task : undefined,

}


const task =
{
    task_name : "Check pressure",
    description : "If everything is functioning properly, the manometer on the boiler should read 101Psi.", //The description provides the worker with precise instructions on what needs to be done.
    time_duration : 5, //This indicates the approximate duration of the task in minutes.
    machine_link_id : 3202, //This is the machine ID for which this task needs to be completed.
    status : "in progress", //the status can have 4 states : future/in progress/done/not finish
    time_bet : 365 //This indicates the interval between each occurrence of when the task needs to be done, measured in days.
}