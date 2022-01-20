var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var user     = require("../models/user");
var bcrypt   = require("bcryptjs");


//REGISTERATION
//Register Form
router.get("/register", function (req, res) {
    res.render("signUpForm.ejs");
});
//Register Route
router.post("/register", function (req, res) {
    var error = [];
    var name = req.body.name,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        password2 = req.body.password2,
        phone = req.body.phone;

    if (name == '' || email == '' || username == '' || phone == '') {
        error.push({msg: "Please fill all the details"});
        res.render("signUpForm.ejs", {
            name: name,
            email: email,
            username: username,
            phone: phone,
            err: error
        });
    }
    if (!(password == password2)) {
        error.push({msg: "Password Mismatch"});
        res.render("signUpForm.ejs", {
            name: name,
            email: email,
            username: username,
            phone: phone,
            err: error
        });
    }
    if (user.findOne({username: username}, function (err, User) {
        if (err) {
            throw err;
        }

        if (User) {
            error.push({msg: "Username already registered"});
            res.render("signUpForm.ejs", {
                name: name,
                email: email,
                username: username,
                phone: phone,
                err: error
            });
        } else {
            const newUser = new user({
                name: name,
                email: email,
                username: username,
                phoneNumber: phone,
                password: password
            });

            bcrypt.genSalt(10, function (err, salt) {
                if (!err) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (!err) {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success', "Successfully registered, please login to continue");
                                    res.redirect('/login');
                                })
                                .catch(err => {
                                    throw err;
                                })
                        }
                    });
                }
            });
        }
    }));
});


//LOGIN
//Login Form
router.get("/login", function (req, res) {
    res.render("loginForm.ejs");
});

//Login Route
router.post("/login", function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
});


//LOGOUT
//Logout Route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash('success', 'Logged out successfully');
    res.redirect("/");
});


module.exports = router;