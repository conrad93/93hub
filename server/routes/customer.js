var express = require('express');
var router = express.Router();
var CustomerControl = require("../controllers/customer");

router.post("/sign-in", CustomerControl.signin);
router.post("/sign-up",  CustomerControl.signup);
router.get("/verify", CustomerControl.verify);

module.exports = router;