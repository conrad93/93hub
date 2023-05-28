var express = require('express');
var router = express.Router();
var FileControl = require("../controllers/file");
var Auth = require("../middleware/auth");

router.post("/form/:model", FileControl.form);
router.post("/upload", FileControl.upload);
router.get("/show/*", FileControl.show);

module.exports = router;