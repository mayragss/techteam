


// all the middleare goes here
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Precisas estar logado para fazer isso!");
    res.redirect("/login");
}

module.exports = middlewareObj;