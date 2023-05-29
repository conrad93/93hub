var express = require('express');
var router = express.Router();
var SiteControl = require("../controllers/site");

router.get("/:username", SiteControl.getSite);

module.exports = router;