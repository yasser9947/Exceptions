const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB , { useUnifiedTopology: true , useNewUrlParser: true }
,
()=> console.log('mongodb is connect '))

app.use(express.urlencoded({extended:false}));
app.use(express.json());













app.use('/api/todo' , require ('./routers/todo.route'));

app.listen(4000 , ()=> console.log('server run on 4000'))
