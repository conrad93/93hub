const TemplateService = require("../services/template");
const config = require("../config/config").get(process.env.NODE_ENV);

const list = async function(req,res) {
    try {
        let data = req.body;
        let response = await TemplateService.list(data);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message:error.message, error:error});
    }
}

module.exports = {
    list: list
};