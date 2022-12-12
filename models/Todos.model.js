const mongoose = require("mongoose")


const todoSchema = new mongoose.Schema({
    Heading : {type : String, required : true},
    Note : {type : String, required : true},
    Tag: {type : String, required : true},
    userId : {type : String, required : true}
})

const TodoModel = mongoose.model("todo", todoSchema)


module.exports = {
    TodoModel
}