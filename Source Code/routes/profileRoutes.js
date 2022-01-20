var express = require("express");
var router  = express.Router();
var user    = require("../models/user");


//Dashboard
router.get("/", isLoggedIn, function (req, res) {
    res.render("dashboard.ejs");
})

//Edit Profile
router.get("/edit", isLoggedIn, function (req, res) {
    res.render("updateProfile.ejs");
})

router.put("/edit", isLoggedIn, function (req, res) {
    // user.findByIdAndUpdate(req.user._id, {
    //     name: req.body.name,
    //     email: req.body.email,
    //     phoneNumber: req.body.phone
    // });

    // user.findOne({username: req.body.username}, function (err, User) {
    //     if(err){
    //         throw err;
    //     }
    //
    //     if(User){
    //         User.name = req.body.name;
    //         User.email = req.body.email;
    //         User.phoneNumber = req.body.phone;
    //         User.save()
    //             .then(user=> {
    //                 req.flash('success', "Changes successfully changed");
    //                 res.redirect("/profile");
    //             })
    //             .catch(err=>{
    //                 throw err;
    //             })
    //     }
    // });

    if (user.findOne({username: req.body.username}, function (err, User) {
        if (err) {
            throw err;
        }

        if (User) {
            User.name = req.body.name;
            User.email = req.body.email;
            User.phoneNumber = req.body.phone;
            // User.save()
            //     .then(user => {
            //         req.flash('success', "Changes successfully changed");
            //         res.redirect('/login');
            //     })
            //     .catch(err => {
            //         throw err;
            //     })
        }
    })) ;
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You need to login first!");
        res.redirect("/login");
    }
}

module.exports = router;