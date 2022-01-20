var mongoose = require("mongoose");

// var passport = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    name: String
});

// userSchema.plugin(passport);

var user = mongoose.model("User", userSchema);

module.exports = user;