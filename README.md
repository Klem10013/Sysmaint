# Sysmaint
This is the project for the cloud architecture project 
in the unicorn univesity 
backend/fronend implementation of an app


<h1> List of commande : </h1>
    
<h3>Company : </h3> 

    create comapny
        Methode post (body in Json)
        {
            user_name : "User name",
            id_company : "Name of the company",
            Email address : "the Email address of the user"
        }
        
    Delet company
        Methode post (body in Json)
        {
            user_name : "User name"
            user_token : "the token of the user obtain after there connection"
            id_company : "the id of the company that they want to delet"
        }

<h3>User :</h3>

    Add user to an company
        Methode post (body in Json)
        {
            user_name : "The User name of the creator of the User",
            user_token : "The token of the user that want to add a new user",
            id_company : "The id of the company that the user try add a new employee",

            user_name_add : "The User name of the new employee",
            address_add : "The email address of the new employee",
            privilege : "The privilege of the new user"
        }

    
    Modify user 
        Methode post (body in Json)
        {
            user_name : "The User name of the Employee that want ot modify the User",
            user_token : "The token of the user that want to modify an user",
            id_company : "The id of the company that the user try modify an employee",

            user_modify : "This is the User name of the user that will be modify"
            ... : "The element in the employee that need to change"
        }


    Delet User
        Methode post (body in Json)
        {
            user_name : "The User name of the Employee that want ot delet an User",
            user_token : "The token of the user that want to delet an user",
            id_company : "The id of the company that the user try delet an employee",

            user_delet : "This is the User name of the user that will be delet"
         }


    Connect
        Methode post (body in Json)
        {
            user_name : "The user name of the user that want to connect",
            pwd : "the password of the user"
            id_company : "the is of the company the user belong to"
        }


<h3>Machine :</h3>

    Add machine to an company
        Methode post (body in Json)
        {
            user_name : "The User name of the creator of the Machine",
            user_token : "The token of the user that want to add a new Machine",
            id_company : "The id of the company that the user try add a new Machine",

            Machine_name_add : "The User name of the new Machine",
        }


    Modify user
        Methode post (body in Json)
        {
            user_name : "The User name of the Employee that want ot modify the Machine",
            user_token : "The token of the user that want to modify an Machine",
            id_company : "The id of the company that the user try modify an Machine",

            machine_modify : "This is the machine name of the machine that will be modify"
            ... : "The element in the machine data that need to change"
        }


    Delet User
        Methode post (body in Json)
        {
            user_name : "The User name of the Employee that want ot delet an Machine",
            user_token : "The token of the user that want to delet an Machine",
            id_company : "The id of the company that the user try delet an Machine",

            Machine_delet : "This is the Machine name of the Machine that will be delet"

        }







