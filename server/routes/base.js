var express = require('express');
var router = express.Router();
var BaseControl = require("../controllers/base");
var Auth = require("../middleware/auth");

router.post("/list/:model", BaseControl.list);
router.post("/create/:model", BaseControl.create);
router.post("/update/:model", BaseControl.update);

module.exports = router;