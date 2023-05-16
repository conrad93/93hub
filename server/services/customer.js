const Customer = require("../models/customer");

const create = async function(data) {
    try {
        let doc = new Customer(data);
        let response = await doc.save();
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const getCustomer = async function(data, fields) {
    try {
        let customer = await Customer.findOne({...data}, fields).lean();
        return {status: true, message:"Success!", data: customer};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const updateById = async function(id,data) {
    try {
        let customer = await Customer.updateOne({_id: id}, {...data});
        return {status: true, message:"Success!", data: customer};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

module.exports = {
    create: create,
    getCustomer: getCustomer,
    updateById: updateById
};