var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    console.log("template: ", req.query.template, " bottomText: ", req.query.bottomText, " topText: ", req.query.topText);
    res.send(req.body);
})

module.exports = router;