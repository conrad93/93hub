var express = require('express');
var router = express.Router();
var CustomerControl = require("../controllers/customer");
var Auth = require("../middleware/auth");

router.post("/sign-in", CustomerControl.signin);
router.post("/sign-up",  CustomerControl.signup);
router.get("/verify", CustomerControl.verify);
router.post("/update/:id", Auth.verify, CustomerControl.update);
router.post("/update-password", Auth.verify, CustomerControl.updatePassword);

module.exports = router;