var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var CandidatoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    message: String,
    vaga: String
});

CandidatoSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Candidato", CandidatoSchema);