const express = require("express");

const router = express.Router();


router.get("/", (request, response) => {
    response.render("index.hbs")
});


router.route("/enroll")
    .get((req, res) => {
        res.render("enroll")
    })



module.exports = router;