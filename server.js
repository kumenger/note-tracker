const express = require("express");
const path = require("path");
const notes = require('./db.json');
const generateId = require("./helper/generateId");
const fs = require("fs");
fspromises=require('fs').promises

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
   

    fs.readFile(__dirname +'/db.json', "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        let parsedData = JSON.parse(data);

        parsedData.push(newNote);
        console.log(parsedData)
       async function main(){
          try {
            await  fs.writeFile(__dirname +'/db.json', JSON.stringify(parsedData), (err) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send("data wrriten");
          }
        })
          } catch (error) {
            console.log(error)
          }
        }
       main()
      }
    });
  } else {
    res.status(404).send("title and text requred");
  }
});
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(__dirname +'/db.json', "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
     
      let filtersarry = parsedData.filter((elm) => elm.id !== id);
      console.log(filtersarry)
     
      fs.writeFileSync(__dirname +'/db.json', JSON.stringify(filtersarry), (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
      } else {
          res.send("data deleted");
        }
      });
    }
  });
});

app.listen(PORT, () => console.log(`server running at http://localhost:3002/`));
