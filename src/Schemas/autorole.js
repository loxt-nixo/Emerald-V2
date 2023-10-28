const { model, Schema } = require('mongoose');
 
let autorole = new Schema({
    Guild: String,
    Role: String,
});
 
module.exports = model("autorole", autorole);
