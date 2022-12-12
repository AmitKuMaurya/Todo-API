const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {TodoModel} = require("../models/Todos.model")

const todosController = Router();


todosController.get("/", async (req, res) => {
    const {tag} = req.query
    const notes = await TodoModel.find({userId : req.body.userId, tag})
    res.send(notes)
})


todosController.post("/create", async (req, res) => {
    const {Heading, Note, Tag, userId} = req.body;
    const note = new TodoModel({
        Heading,
        Note,
        Tag,
        userId
    })
    try{
        await note.save()
        res.send("note created")
    }
    catch(err){
        res.send("something went wrong")
    }
})


todosController.delete("/delete/:todoId", async (req, res) => {
    const {todoId} = req.params
    const deletedNote = await TodoModel.findOneAndDelete({_id : todoId, userId : req.body.userId})
    if(deletedNote){
        res.status(200).send("Deleted")
    }
    else{
        res.send("couldn't delete")
    }
})

todosController.patch("/edit/:todoId", async (req, res) => {
    const {todoId} = req.params
    const deletedNote = await TodoModel.findOneAndUpdate({_id : todoId, userId : req.body.userId},req.body)
    if(deletedNote){
        res.send("Deleted")
    }
    else{
        res.send("couldn't delete")
    }
})


module.exports = {
    todosController
}