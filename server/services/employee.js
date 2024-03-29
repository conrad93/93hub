const Employee = require("../models/employee");

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

const getEmployee = async function(data, fields) {
    try {
        let employee = await Employee.findOne({...data}, fields).lean();
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

module.exports = {
    create: create,
    getEmployee: getEmployee,
    updateById: updateById
};