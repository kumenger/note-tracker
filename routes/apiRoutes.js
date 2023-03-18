const router = require('express').Router();


const fs = require("fs");
const util = require("util");

const generateId = require("../helper/generateId");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// requesting the existing notes

router.get('/notes', (req, res) => {
    readFileAsync("db/db.json", "utf8")
        
    .then(data=>JSON.parse(data)).then(notes => 
        res.json(notes))
    .catch(err => {
        res.status(500).json(err)
    })
  
})

// posting note function route 

router.post('/notes', (req, res) => {
    readFileAsync("db/db.json", "utf8").then((data)=>
    { 
        const{title,text}=req.body
        newtext={title,text,id:generateId()}
        newData=JSON.parse(data)
        lastData=[...newData,newtext]
        writeFileAsync("db/db.json",JSON.stringify(lastData)).then(updatedData=>res.json(updatedData))

     }
    
    )
})


// delete note function route

router.delete('/notes/:id', (req, res) => {
    readFileAsync("db/db.json", "utf8").then((data)=>
    { 
        
        newData=JSON.parse(data)
        lastData=newData.filter(elem=>elem.id!==req.params.id)
        writeFileAsync("db/db.json",JSON.stringify(lastData)).then(updatedData=>res.json(updatedData))

     }
    
    )
})
router.get('/notes/test/',(req,res)=>{
    readFileAsync("db/db.json", "utf8")
        
        .then(data=>JSON.parse(data)).then(notes => 
            res.json(notes))
        .catch(err => {
            res.status(500).json(err)
        })
  
 

});

module.exports = router;