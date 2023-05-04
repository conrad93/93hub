const Template = require("../models/template");
const ejs = require("ejs");

const list = async function(data) {
    try {
        let response = await Template
        .find(data.filter, data.fields)
        .limit(data.limit || 100)
        .skip(
            (data.limit || 100) * ((data.page || 1) - 1)
        )
        .sort({
            [data.sort_by || "createdAt"]: data.sort_type ? (data.sort_type === "ASC" ? 1 : -1) : -1
        }).lean();
        let count = await Template
        .find(data.filter, data.fields)
        .count();
        for (let i = 0; i < response.length; i++) {
            if(response[i].details && response[i].template){
                response[i].details = JSON.parse(response[i].details);
                response[i].preview = getTemplate(response[i].template, {data: response[i].details.preview});
            }
        }
        return {status: true, message:"Success!", data: response, count: count};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const getTemplate = function(template, data){
    return ejs.render(template, data);
}

module.exports = {
    list: list,
    getTemplate: getTemplate
};