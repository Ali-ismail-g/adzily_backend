const Todo = require("../Models/Todo")
const User = require("../Models/User")
const mongoose = require('mongoose');


//add new Todo
exports.addTodo = (req,res)=>{
    const {body : {todo}} = req
    const mytodos = new Todo({
        _id: new mongoose.Types.ObjectId,
        todo,
    })
    User.findById({_id:req.userId},(error,user)=>{
        if(error) return res.send(error);
        user.todos.push(mytodos);
        user.save((error,user)=>{
        if(error) return res.send(error);
        })
    });
    mytodos.save((error,mytodos)=>{
        if(error) return res.send(error);
        res.json(mytodos);
    })
}
//View all my todos
exports.getAllTodos = (req,res)=>{
    User.findById({_id:req.userId}).populate('todos')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}
//62883a403cfc1b2ae522d965