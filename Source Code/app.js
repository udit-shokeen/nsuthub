//PORT SETUP
const PORT           = process.env.PORT || 3000;


//EXPRESS
var express          = require("express"),
    app              = express();

app.use(express.static("public"));


//PASSPORT
var passport         = require('passport');
require('./config/authStrategy')(passport);


//BYCRYPT
var bcrypt = require("bcryptjs");


//MONGOOSE
var mongoose         = require("mongoose");
mongoose.connect('mongodb://localhost/nsutHub', {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://admin:admin@nsut-hub.8bh9c.gcp.mongodb.net/nsutHub?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


//BODY PARSER
var bodyParser       = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));


//METHOD OVERRIDE
var methodOverride   = require("method-override");
app.use(methodOverride("_method"));


//FLASH CONNECT
var flash = require("connect-flash");
app.use(flash());


//MODELS
var user = require("./models/user");


//EXPRESS SESSION
var expressSession   = require('express-session');
app.use(expressSession({
    secret: "nsutHub",
    resave: true,
    saveUninitialized: true
}));


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//Routes

var authRoutes    = require('./routes/authRoutes');
var indexRoutes   = require('./routes/indexRoutes');
var profileRoutes = require('./routes/profileRoutes');


//Global variable middleware
app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('failure');
    res.locals.error = req.flash('error');
    next();
});

app.use(authRoutes);
app.use(indexRoutes);
app.use("/profile", profileRoutes);


//Server setup
app.listen(PORT, function(){
    console.log("Server has started...");
});