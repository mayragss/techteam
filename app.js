var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Email         = require("./models/email"),
    Candidato     = require("./models/candidato"),
    
    User        = require("./models/user")
    


//requiring routes
var indexRoutes      = require("./routes/index"),
    emailRoutes      = require("./routes/email"),
    candidatoRoutes  = require("./routes/candidato")
 
//var url = process.env.DATABASEURL || "mongodb://localhost/bdbdt";
//mongoose.connect('mongodb://localhost/bdbdt', { useMongoClient: true });
mongoose.connect('mongodb://localhost/tteam', { useMongoClient: true });
//mongoose.connect('mongodb://tech:tT2017@ds145895.mlab.com:45895/tteam', { useMongoClient: true });




const session = require('express-session'),
MongoStore = require('connect-mongo')(session);
 
app.use(session({
    secret: "Deus e pai",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));





app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database 


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "amen",
    resave: false,
    saveUninitialized: false
}));

/*
app.use(
   express.session({
     store: new SessionStore({
     url: 'mongodb://admin:maymay1@ds121834.mlab.com:21834/buedeticks',
     interval: 1200000
   }),
   cookie: { maxAge: 1200000 },
   secret: 'my secret'
 }))*/


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/email", emailRoutes);
app.use("/candidatos", candidatoRoutes);

app.get('*',(req,res)=>{
    res.redirect("/")
})

port= 8080;
app.listen(process.env.PORT || 8080, function(){
   console.log("TECHTEAM");
});