const allNotes = require("../db.json");

const generateId = () => {
  console.log(allNotes.length - 1);
  let id = allNotes.length || 1;
  return  `${id + 1}`
};
module.exports = generateId;
