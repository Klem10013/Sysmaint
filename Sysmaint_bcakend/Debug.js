function debug(message) {
    // Create a new Error object to capture the stack trace
    const err = new Error();

    // Extract the caller's filename from the stack trace
    // Return the filename of the caller
    const stack_split = err.stack.split('\n')
    const info = stack_split[2].trim().split(' ')
    const temp = info[info.length - 1].split('\\');
    const name_of_file = temp[temp.length - 1].split('.')[0];
    let name_of_function = "Path"
    if (info.length > 1) {
        name_of_function = info[1]
    }
    let Space = "";
    let i = 3
    let find_layer = "";
    //console.log(stack_split);
    if (i < stack_split.length) {
        do {

            let info_layer = stack_split[i].trim().split(' ')
            let temp_space = info_layer[info_layer.length - 1].split('\\');
            find_layer = temp_space[temp_space.length - 1].split('.')[0];
            if (find_layer !== "layer")
            {
                Space += "|  ";
            }
            i+=1;

        }while (i < stack_split.length && find_layer !== "layer");
    }
    const response = Space + "File " + name_of_file + " | Function " + name_of_function + " | Message " + message;
    console.log(response)
    //return ;
}


module.exports.debug = debug;