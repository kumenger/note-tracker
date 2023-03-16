const fs = require("fs");
const path = require("path");

const writeFile =  (path, data) => {
    try{ fs.writeFile(path, data, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send("data wrriten");
    }
  })}
catch(err){
    console.log(console.log(err))
}
 
};
module.exports = writeFile;
