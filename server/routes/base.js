var express = require('express');
var router = express.Router();
var BaseControl = require("../controllers/base");
var Auth = require("../middleware/auth");

router.post("/get-by-id/:model/:id", Auth.verify, BaseControl.getById);
router.post("/list/:model", Auth.verify, BaseControl.list);
router.post("/get-data/:model", Auth.verify, BaseControl.getData);
router.post("/create/:model", Auth.verify, BaseControl.create);
router.post("/update/:model", Auth.verify, BaseControl.update);

module.exports = router;