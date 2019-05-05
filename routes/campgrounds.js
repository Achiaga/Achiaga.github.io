var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground")
var middleware  = require("../middleware")

// INDEX -- Show All Campgrounds
router.get("/", function(req, res){
    // All campgrounds the DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user}); // {This is the given name : this is what we pass to the other side}
            }
    })
});

//NEW -- Show Form To Create a New Campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

// Create -- Add New Campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add it to our list
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    }
    var newCampground = {name: name, image: image, description: desc, author: author} // I need to pass img bc is the name that has in the array so it matches
    //Create a new campground and save it to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated)
            res.redirect("/campgrounds");
        }
    });
});

// Show -- Show more info about campgrounds
router.get("/:id", function(req, res){
    // find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){  //(id, callback)
        if(err){
            console.log(err);
        }else{
            /*console.log(foundCampground);*/
             // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        };
    });
});

// EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnerhip, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Can't find that Campground");
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE Campground Route
router.put("/:id", middleware.checkCampgroundOwnerhip, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    //redirect somewhere(show page)
})

// Destroy Campgrounds Route
router.delete("/:id", middleware.checkCampgroundOwnerhip, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err, updatedCampgrounds){ // (id newData callback)
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");    
        }
    })
})

module.exports = router;