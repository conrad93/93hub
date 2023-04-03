var express = require('express');
var router = express.Router();
var BaseControl = require("../controllers/base");
var Auth = require("../middleware/auth");

router.post("/list/:model", Auth.verify, BaseControl.list);
router.post("/create/:model", Auth.verify, BaseControl.create);
router.post("/update/:model", Auth.verify, BaseControl.update);

module.exports = router;