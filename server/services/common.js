const jwt = require("jsonwebtoken");

const generateToken = function(data, expiresIn){
    return jwt.sign({data: data}, process.env.JWT_SECRET, {expiresIn: expiresIn});
}

const verifyToken = function(data){
    return jwt.verify(data, process.env.JWT_SECRET);
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
};