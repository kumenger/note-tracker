const express = require("express");
const path = require("path");
const notes = require('./db/db.json');
const generateId = require("./helper/generateId");
const fs = require("fs");
fspromises = require("fs").promises;

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  //res.json(notes)
});

app.get("/api/notes", (req, res) => {
  return res.status(200).json(notes);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = { title, text, id: generateId() };

    let db = fs.readFileSync(`${__dirname}/db/db.json`);
    db = JSON.parse(db);
    res.json(db);
   
    db.push(newNote);
    fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(db));
    res.json(db);
  

  
  

   
  } else {
    res.status(404).send("title and text requred");
  }
});
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  let db = fs.readFileSync(`${__dirname}/db/db.json`);
    db = JSON.parse(db);
    let filtersarry = db.filter((elm) => elm.id !== id);
    res.json(filtersarry);
   
 
    fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(filtersarry));
    res.json(filtersarry);
});

app.listen(PORT, () => console.log(`server running at http://localhost:3002/`));
