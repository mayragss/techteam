var express = require("express");
var router  = express.Router();
var Candidato = require("../models/candidato");
var middleware = require("../middleware");


//INDEX - show all Candidato
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all Candidato from DB
    Candidato.find({}, function(err, allCandidato){
       if(err){
           console.log(err);
       } else {
          res.render("candidatos/index",{candidatos:allCandidato});
       }
    });
});

//CREATE - add new Candidato to DB
router.post("/",  function(req, res){
    // get data from form and add to Candidatos array
    var nome = req.body.nome;
    var email = req.body.nome;
    var message = req.body.message;
    var newEmail = {nome: nome, email: email, message: message}
    // Create a new Candidato and save to DB
    Candidato.create(newCandidato, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to Candidato page
            console.log(newlyCreated);
            res.redirect("/candidatos");
        }
    });
});

//NEW - show form to create new Candidato
router.get("/new",  function(req, res){
   res.render("candidatos/new"); 
});

// SHOW - shows more info about one Candidato
router.get("/:id", function(req, res){
    //find the Candidato with provided ID
    Candidato.findById(req.params.id).exec(function(err, foundCandidato){
        if(err){
            console.log(err);
        } else {
            console.log(foundCandidato)
            //render show template with that Candidato
            res.render("candidatos/show", {candidato: foundCandidato});
        }
    });
});



// DESTROY Candidato ROUTE
router.delete("/:id", function(req, res){
    Candidato.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/candidatos");
      } else {
          res.redirect("/candidatos");
      }
   });
});


module.exports = router;