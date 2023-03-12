var express = require('express');
var router = express.Router();
var EmployeeControl = require("../controllers/employee");
var Auth = require("../middleware/auth");

router.post("/login", EmployeeControl.login);
router.post("/create", Auth.verify, EmployeeControl.create);
router.get("/verify", EmployeeControl.verify);

module.exports = router;