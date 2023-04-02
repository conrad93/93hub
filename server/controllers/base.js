const BaseService = require("../services/base");
const config = require("../config/config").get(process.env.NODE_ENV);

const list = async function(req,res) {
    try {
        let data = {};
        data["body"] = req.body;
        data["model"] = req.params.model;
        let response = await BaseService.list(data);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

const create = async function(req,res) {
    try {
        let data = {};
        data["body"] = req.body;
        data["model"] = req.params.model;
        let response = await BaseService.create(data);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

const update = async function(req,res) {
    try {
        let id = req.body._id;
        let data = {};
        data["model"] = req.params.model;
        data["body"] = {};
        Object.keys(req.body).forEach(key => {
            if(key !== '_id'){
                data["body"][key] = req.body[key];
            }
        });
        let response = await BaseService.updateById(id, data);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

module.exports = {
    list: list,
    create: create,
    update: update
};