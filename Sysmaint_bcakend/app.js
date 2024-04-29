const express = require("express");
const app = express() ;

const user_connected = [];



module.exports = {user_connected};

app.post("/health",(req,res,_next ) => {
    console.log("haaaaaaaaaaaaa ");
    res.send("<h1>Services is up</h1>");
});


app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the HTTP methods specified
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the headers specified
    next();
});
//app.use(require('cors'))
app.use("/client",require("./routes/client"));
app.use("/machines",require("./routes/machines"));
app.use("/create_company",require("./routes/company"));
app.use("/task",require("./routes/task"))
app.use("/calendar",require("./Routes/calendar"))

app.listen(3001)