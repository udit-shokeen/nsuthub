var express = require("express");
var router  = express.Router();

//Homepage
router.get("/", function(req, res){
    res.render("index.ejs", {about: true});
});

//Notes
router.get("/notes", function (req, res) {
    res.render("notes.ejs");
});

//Question Paper
router.get("/questionpaper", function (req, res) {
    res.render("quesPapers.ejs");
});


module.exports = router;