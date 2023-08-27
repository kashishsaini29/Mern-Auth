const express = require("express");

const app =express();
require("./db/conn.js");
const router=require('./routes/router');
const cookieParser =require('cookie-parser')
const cors=require("cors");
const port=8080;

// app.get('/',(req,res)=>{
//     res.status(200).send("server Created");
// })

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router); 

app.listen(port,()=>{
    console.log(`Server start at port no. ${port}`);
})