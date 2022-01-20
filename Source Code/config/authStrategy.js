var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");
var bcrypt        = require("bcryptjs");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if(err){
                    throw err;
                }
                if(!user){
                    done(null, false, {message: 'Please enter a valid username'});
                }
                else{
                    bcrypt.compare(password, user.password, function (err, isSame) {
                        if(isSame){
                            done(null, user);
                        }
                        else{
                            done(null, false, {message: 'Password Incorrect'});
                        }
                    })

                }
            })
        })

    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

