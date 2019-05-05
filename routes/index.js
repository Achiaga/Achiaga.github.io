var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// Root Route
router.get("/", function(req, res){
    res.render("landing")
})

// Show Register Form
router.get("/register", function(req, res){
    res.render("register");
})

// Handle Sign Up Logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error", err.message );
            res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome Argonaut " + user.username);
            res.redirect("/campgrounds");
        })
    }) 
})

// Show Login Form
router.get("/login", function(req, res){
    res.render("login");
})

// Handling Login Logic
router.post("/login", passport.authenticate("local" ,{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req, res){
});

// Handling Logout Logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You successfully logout!")
    res.redirect("/campgrounds");
});

module.exports = router;