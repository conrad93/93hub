const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");

const create = async function(data) {
    try {
        let doc = new Employee(data);
        let response = await doc.save();
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const getEmployee = async function(data) {
    try {
        let employee = await Employee.findOne({...data}, {name: 1, email: 1, password: 1, status: 1, token: 1});
        return {status: true, message:"Success!", data: employee};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const updateById = async function(id,data) {
    try {
        let employee = await Employee.updateOne({_id: id}, {...data});
        return {status: true, message:"Success!", data: employee};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const generateToken = function(data, expiresIn){
    return jwt.sign({data: data}, process.env.JWT_SECRET, {expiresIn: expiresIn});
}

const verifyToken = function(data){
    return jwt.verify(data, process.env.JWT_SECRET);
}

module.exports = {
    create: create,
    getEmployee: getEmployee,
    updateById: updateById,
    generateToken: generateToken,
    verifyToken: verifyToken
};