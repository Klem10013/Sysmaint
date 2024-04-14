const express = require("express");
const app = express() ;

const user_connected = [];


module.exports = {user_connected};

app.get("/health",(req,res,_next ) => {
    res.send("<h1>Services is up</h1>");
});


app.use(express.json());
app.use("/client",require("./routes/client"));
app.use("/machines",require("./routes/machines"));
app.use("/create_company",require("./routes/company"));
app.use("/task",require("./routes/task"))
app.use("/calendar",require("./Routes/calendar"))

app.listen(3001)