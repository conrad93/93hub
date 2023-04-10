var express = require('express');
var router = express.Router();
var FileControl = require("../controllers/file");
var Auth = require("../middleware/auth");

router.post("/form/:model", FileControl.form);

module.exports = router;