var express = require('express');
var router = express.Router();
var TemplateControl = require("../controllers/template");
var Auth = require("../middleware/auth");

router.post("/list", TemplateControl.list);
router.get("/image/:code", TemplateControl.getImage);
router.post("/preview/:code", TemplateControl.preview);

module.exports = router;