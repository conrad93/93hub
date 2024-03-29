var dotenv = require("dotenv");
var express = require('express');
var cors = require('cors');

dotenv.config();
var app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:false}));
app.use("/static", express.static("public"));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, "../client/dist/93hub")));

module.exports = app;