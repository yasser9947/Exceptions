const express = require('express');
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/todo.model');
const router = express.Router();
const Todo = require('../models/todo.model');




// get all todo
router.get ('/' , async (req , res )=> {
    try{
        const allTodo = await Todo.find()   
        res.status(200).json(allTodo) ;
    }
    catch {
        res.status(404).json({message: 'Not Found!!'})
    }
})


// get one 
router.get ('/:id' , async (req , res )=> {
    try{
        const getOneTodo = await Todo.findById(req.params.id)    
        res.status(200).json(getOneTodo) ;
    }
    catch {
        res.status(404).json({message: 'Not Found!!'})
    }
})

// add one Todo
router.post('/' , async (req , res )=> {
    try{
        const newTask = new Todo(req.body)
        await newTask.save()
        res.status(200).json(newTask) ;
    }
    catch(eroor){
    res.status(501).json({message: eroor.message , url : req.originalUrl})
    }
})


// update Todo 
router.put('/:id' , async (req , res)=>{
    try{
        const updateTask = await Todo.findByIdAndUpdate(req.params.id ,  {...req.body} , {new : true , useFindAndModify : false})
        res.status(200).json(updateTask) ;
    }catch(eroor){
        res.status(501).json({message: eroor})
    }
})


// delete Todo
router.delete('/:id' , async (req, res)=>{
    try{
        const deleteTask = await Todo.findByIdAndDelete(req.params.id)
        if (!deleteTask) throw new Error("this task is not in our db" )
        res.status(200).json(deleteTask)
    }catch(eror){
        res.status(501).json({message: eror.message , url:req.originalUrl})
    }
})






module.exports = router;
