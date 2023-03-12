const express = require("express");
const path=require('path')
const notes=require('./Develop/db/db.json')
//const x=require('./Develop/public/notes.html')
const PORT = process.env.PORT || 3002;
const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('Develop/public'))
app.get('/',(req,res)=>{
    res.sendFile(path.join( __dirname,'index.html'))
})
app.get('/notes',(req,res)=>{
    res.sendFile(path.join( __dirname,'Develop/public/notes.html'))
    //res.json(notes)
})
app.get('*',(req,res)=>{
    res.sendFile(path.join( __dirname,'Develop/public/index.html'))
})

app.listen(PORT,()=>console.log(`server running at http://localhost:3002/`))