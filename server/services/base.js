const mongoose = require('mongoose');

const list = async function(data) {
    try {
        const model = mongoose.models[data.model] || require("../models/" + data.model);
        let response = await model
        .find(data.body.filter, data.body.feilds)
        .limit(data.body.limit || 100)
        .skip(
            (data.body.limit || 100) * ((data.body.page || 0) - 1)
        )
        .sort({
            [data.body.sort_by || "createdAt"]: data.body.sort_type ? (data.body.sort_type === "ASC" ? 1 : -1) : -1
        });
        let count = await model
        .find(data.body.filter, data.body.feilds)
        .count();
        return {status: true, message:"Success!", data: response, count: count};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const create = async function(data) {
    try {
        const model = mongoose.models[data.model] || require("../models/" + data.model);
        let doc = new model(data.body);
        let response = await doc.save();
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const updateById = async function(id, data) {
    try {
        const model = mongoose.models[data.model] || require("../models/" + data.model);
        let response = await model.updateOne({_id: id}, {...data.body});
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const getById = async function(id, modelName, fields) {
    try {
        const model = mongoose.models[modelName] || require("../models/" + modelName);
        let response = await model.findById(id, fields);
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const getData = async function(data) {
    try {
        const model = mongoose.models[data.model] || require("../models/" + data.model);
        let response = await model
        .find(data.body.filter, data.body.feilds);
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

module.exports = {
    list: list,
    create: create,
    updateById: updateById,
    getById: getById,
    getData: getData
};