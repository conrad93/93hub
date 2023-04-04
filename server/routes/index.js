var express = require('express');
var router = express.Router();
var EmployeeRoute = require("./employee");
var BaseRoute = require("./base");

router.use("/api/employee",EmployeeRoute);
router.use("/api/base",BaseRoute);

router.use("*",(req,res) => {
    console.log("404: Route not found");
    res.status(404).send('404: Route not found');
});

module.exports = router;