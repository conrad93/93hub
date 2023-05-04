const jwt = require("jsonwebtoken");
const ejs = require("ejs");

const generateToken = function(data, expiresIn){
    return jwt.sign({data: data}, process.env.JWT_SECRET, {expiresIn: expiresIn});
}

const verifyToken = function(data){
    return jwt.verify(data, process.env.JWT_SECRET);
}

const getTemplate = function(template, data){
    return ejs.render(template, data);
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    getTemplate: getTemplate
};