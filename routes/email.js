var express = require("express");
var router  = express.Router();
var Email = require("../models/email");
var middleware = require("../middleware");


//INDEX - show all Emails
router.get("/int", middleware.isLoggedIn, function(req, res){
    // Get all Emails from DB
    console.log('entrou no email')
    Email.find({}, function(err, allEmails){
       if(err){
           console.log(err);
       } else {
          res.render("emails/index",{emails:allEmails});
       }
    });
});

function senMessage(msg, email, name) {     

    const message = `
    Nome do cliente: ${name}\nEmail: ${email}\nMensagem: \n${msg}`;

    const accountSid = 'AC5380ebfa8fed7b1d53eda0ff9dcceb8f';
    const authToken = 'b11f00eb4f20e5e631d3ebc7213441f0';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: `${message}`,
            to: `whatsapp:+55957056779`
        })
        .then(message => console.log(message));
}

router.post("/", function(req,res) {
    var name = req.body.nome;
    var email = req.body.nome;
    var message = req.body.message;

    senMessage(message,email,name);

    res.redirect("/")
    //res.render("landing",{sucess:"Obrigada por entrar em contacto."})    
})

//CREATE - add new Email to DB
/*router.post("/", function(req, res){
    // get data from form and add to Emails array
    var nome = req.body.nome;
    var email = req.body.nome;
    var message = req.body.message;
    var newEmail = {nome: nome, email: email, message: message}
    // Create a new Email and save to DB
    Email.create(newEmail, function(err, newlyCreated){
        if(err){
            console.log('err \n'+err);
            res.redirect("/emails");
        } else {
            //redirect back to Emails page
            console.log('new created \n'+newlyCreated.doc);
            res.redirect("/emails");
        }
    });
});*/

//NEW - show form to create new Email
router.get("/new", function(req, res){
   res.render("emails/new"); 
});

// SHOW - shows more info about one Email
router.get("/:id", function(req, res){
    //find the Email with provided ID
    Email.findById(req.params.id).exec(function(err, foundEmail){
        if(err){
            console.log(err);
        } else {
            console.log(foundEmail)
            //render show template with that Email
            res.render("email/show", {email: foundEmail});
        }
    });
});



// DESTROY Email ROUTE
router.delete("/:id", function(req, res){
   Email.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/emails");
      } else {
          res.redirect("/emails");
      }
   });
});


module.exports = router;