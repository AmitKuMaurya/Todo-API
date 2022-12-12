const express = require("express")
const cors = require("cors")
require("dotenv").config();
const {userController} = require("./routes/user.route")
const {todosController} = require("./routes/todos.route")
const {connection} = require("./config/db")
const {authentication} = require("./middlewares/authentification")

const app = express();
const PORT =  process.env.PORT_NO || 7080 ;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use(cors())

app.use("/user", userController)
app.use(authentication)
app.use("/todos", todosController)

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db")
    }
    catch(err){
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})