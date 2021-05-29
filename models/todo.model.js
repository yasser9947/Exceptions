const mongoose = require('mongoose');




const todoShema = new mongoose.Schema({

    name : {
        type  : String , required : true
    }, 
    description : {
        type : String , required : true
    },
    status : {
        type : Boolean ,default : false , required : true
    }


} ,{timestamps : true} )

const Todo = mongoose.model('Todo' , todoShema);

module.exports = Todo;