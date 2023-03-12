var express = require('express');
var router = express.Router();
var employeeRoute = require("./employee");

router.use("/api/employee",employeeRoute);

router.use("*",(req,res) => {
    console.log("Error in route.");
    res.status(404).send('No route found!');
});

module.exports = router;