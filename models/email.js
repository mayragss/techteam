var mongoose = require("mongoose"); 

var EmailSchema = new mongoose.Schema({
    nome: String,
    email: String,
    message: String
});
 

module.exports = mongoose.model("Emaill", EmailSchema);