var express = require('express');
var router = express.Router();
var EmployeeRoute = require("./employee");
var CustomerRoute = require("./customer");
var BaseRoute = require("./base");
var FileRoute = require("./file");

router.use("/api/employee", EmployeeRoute);
router.use("/api/customer", CustomerRoute);
router.use("/api/base", BaseRoute);
router.use("/api/file", FileRoute);

router.use("*", (req,res) => {
    console.log("404: Route not found");
    res.status(404).send('404: Route not found');
});

module.exports = router;