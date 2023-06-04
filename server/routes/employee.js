var express = require('express');
var router = express.Router();
var EmployeeControl = require("../controllers/employee");
var Auth = require("../middleware/auth");

router.post("/sign-in", EmployeeControl.signin);
router.post("/create", Auth.verify, EmployeeControl.create);
router.get("/verify", EmployeeControl.verify);
router.post("/update-password", Auth.verify, EmployeeControl.updatePassword);

module.exports = router;