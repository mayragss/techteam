var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Email = require("../models/email");
var middleware = require("../middleware/index");
var Candidato = require("../models/candidato");

//root route
router.get("/", function(req, res){
  
       res.render("landing");
   
});


router.get("/sobre", function(req, res){
  
    res.render("about");

});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});


//email
router.post("/emails", function(req, res){

    /*testing email*/
    
    'use strict';
    const nodemailer = require('nodemailer');
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mayrocas14@gmail.com', // generated ethereal user
                pass: 'Mayragomes1' // generated ethereal password
            }
        });
    
    /* create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ir6wuuxqtpwzn5zr@ethereal.email', // generated ethereal user
            pass: 'fzZfctVczrNHtJD5Q2' // generated ethereal password
        }
    });*/
    
    
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: req.body.email, // sender address
            to: "mayrocas14@gmail.com", // list of receivers
            subject: 'Contato TT', // Subject line
            text: req.body.message, // plain text body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    
        console.log('msg enviada');
        res.redirect('/');
    });
    
    
    
    /*testing email*/
    })
//handle sign up logic
router.post("/candidato", function(req,res){
    var email = req.body.email;
    var nome = req.body.nome;
    var message = req.body.message;
    var newCandidato = {email: email, message: message, nome: nome}
    Candidato.create(newCandidato, function(err,newlyCreated ){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.render("landing");
        }
    })
});

/*
router.post("/email",  function(req,res){
    var email = req.body.email;
    var nome = req.body.nome;
    var message = req.body.message;
    var newEmail = {email: email, message: message, nome: nome}
    Email.create(newEmail, function(err,newlyCreated ){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.render("landing");
        }
    })
});*/



//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Bem-Vindo a TT " + user.username);
           res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/events",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "A sair...");
   res.redirect("/events");
});



module.exports = router;