# Sysmaint
> [!NOTE]
> This is the project for the cloud architecture project 
> in the unicorn univesity 
> backend/fronend implementation of an app


>[!TIP]
>
>To execute any command except 'Create Company', you must first be connected to the server and use the designated token provided upon connection.
>Therefore, the process entails three steps:
>
>1 - Creating a company.
>
>2 - Connecting the user to the server.
>
>3 - Obtaining the token to access and utilize all other commands






<h1> List of commande : </h1>

>[!NOTE]
>All the following command can be send to the back end 


>[!WARNING]
>To user curl and not an alias
```shell
Remove-item alias:curl
```


### Create Company

This methode Create a company

```plaintext
POST /create_company/create_company
```

Create company reques:

```shell
curl -X POST -H "Content-Type: application/json" -d "@./All_test_json/Create_company.json" http://localhost:3001/create_company/create_company
```
```json
{
  "name": "Paule test",
  "id_company":"Company",
  "address": "test@gmail.com"
}
```

### Connect

This Connect the user to the server

```plaintext
POST /client/connect
```

Add client request:

```shell
curl -X POST -H "Content-Type: application/json" -d "@./All_test_json/Connect.json" http://localhost:3001/client/connect
```
```json
{
    "name": "Alice Owner",
    "id_company": "Company_test1",
    "pwd": "the pwd that you obtain after doing the create company command"
}
```

### Add client

This methode Add a new user to the data dabe 

```plaintext
POST /client/add
```

Add client request:

```shell
curl -X POST -H "Content-Type: application/json" -d "@./All_test_json/Add_User.json" http://localhost:3001/client/add
```
```json
{
  "name" : "Alice Owner",
  "id_company" : "Company_test",
  "token" : "The token that you obtain after the connection",

  "name_add": "Bob B",
  "address_add": "test@gmail.com",
  "id_company_add": "Company_test1",
  "privilege_add": 3
}
```

### Add machine

This methode Add a new machine to the data dabe 

```plaintext
POST /machines/add
```

Add machine request:

```shell
curl -X POST -H "Content-Type: application/json" -d "@./All_test_json/Add_machine.json" http://localhost:3001/machines/add
```
```json
{
  "name" : "Alice Owner",
  "id_company" : "Company_test",
  "token" : "The token that you obtain after the connection",

  "machine_name" : "Radiator",
  "description" : "This machine is on the front wall when you enter the hall ",
  "distance" : 10
}
```

### Add task

This methode Add a new task to the data dabe 

```plaintext
POST /task/add
```

Add task request:

```shell
curl -X POST -H "Content-Type: application/json" -d "@./All_test_json/Add_task.json" http://localhost:3001/task/add
```
```json
{
  "name" : "Alice Owner",
  "id_company" : "Company_test",
  "token" : "The token that you obtain after the connection",

  "task_name" : "Check for leaks",
  "time_bet" : 2,
  "machine_link_id" : "Radiator"
}
```


### Get Calendar


This methode return the Calendar of one employee 

>[!CAUTION]
>to use this methode you should create and connect an worker that has the privilege 3 because the owner or a manager does not have maintenance to do  

```plaintext
POST /task/add
```

Get Calendar request:

```shell
curl -X POST -H "Content-Type: application/json" -d "@./All_test_json/Add_task.json" http://localhost:3001/task/add
```
```json
{
  "name" : "Alice Owner",
  "id_company" : "Company_test",
  "token" : "The token that you obtain after the connection",

  "task_name" : "Check for leaks",
  "time_bet" : 2,
  "machine_link_id" : "Radiator"
}
```







<h2>
All of the following command are the one that should be in the final project 
but some of theme are not implemented 
</h2>

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


    Modify MaMachinee
        Methode post (body in Json)
        {
            user_name : "The User name of the Employee that want ot modify the Machine",
            user_token : "The token of the user that want to modify an Machine",
            id_company : "The id of the company that the user try modify an Machine",

            machine_modify : "This is the machine name of the machine that will be modify"
            ... : "The element in the machine data that need to change"
        }


    Delet Machine
        Methode post (body in Json)
        {
            user_name : "The User name of the Employee that want ot delet an Machine",
            user_token : "The token of the user that want to delet an Machine",
            id_company : "The id of the company that the user try delet an Machine",

            Machine_delet : "This is the Machine name of the Machine that will be delet"

        }




<h3>Calendar :</h3>

    Get the Calendar
    Methode Get (body in Json)
    {
        user_name : "The user name of the user that want to get his calendar"
        token : "The token of the user that want to get his calendar"
    }


