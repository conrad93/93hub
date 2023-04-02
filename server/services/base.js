const mongoose = require('mongoose');

const list = async function(data) {
    try {
        const model = mongoose.models[data.model] || require("../models/" + data.model);
        let response = model
        .find(data.filter, data.feilds)
        .limit(data.limit || 100)
        .skip(
            ((data.limit || 100) * ((data.page || 0) - 1))
        )
        .sort({
            [data.sort_by || "createdAt"]: data.sort_type ? (data.sort_type === "ASC" ? 1 : -1) : -1
        });
        return {status: true, message:"Success!", data: response};
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

const updateById = async function(id,data) {
    try {
        const model = mongoose.models[data.model] || require("../models/" + data.model);
        let response = await model.updateOne({_id: id}, {...data.body});
        return {status: true, message:"Success!", data: response};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

module.exports = {
    list: list,
    create: create,
    updateById: updateById
};