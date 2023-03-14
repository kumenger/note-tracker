const allNotes = require("../Develop/db/db.json");

const generateId = () => {
  console.log(allNotes.length - 1);
  let id = allNotes.length || 1;
  return "note_" + (id + 1)
};
module.exports = generateId;
