const Template = require("../models/template");
const ejs = require("ejs");
const FileService = require("./file");

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
        return {status: true, message:"Success!", data: response, count: count};
    } catch (error) {
        console.log(error);
        return {status:false, message:error.message, error:error};
    }
}

const getTemplate = function(template, data){
    return ejs.render(template, data);
}

const getImage = async function(code, callback){
    try {
        let path = FileService.getPath("/templates/" + code + ".png");
        if(FileService.exists(path)){
            let rFile = await FileService.fsReadFile(path); 
            return callback(rFile);
        } else {
            let data = await Template.findOne({code: code}, {template: 1, details: 1}).lean();
            if(data){
                let template = getTemplate(data.template, {data: JSON.parse(data.details).preview});
                let imageBuffer = await FileService.generateImage(template);
                let saveFile = await FileService.saveImageBuffer("/templates", code + ".png", imageBuffer);
                if(saveFile.status){
                    let rFile = await FileService.fsReadFile(path); 
                    return callback(rFile);
                } else {
                    return callback({status: 500, contentType: "text/plain", data: "Error"});
                }
            } else {
                return callback({status: 404, contentType: "text/plain", data: "404 Not Found"});
            }
        }
    } catch (error) {
        console.error(error);
        return callback({status: 500, contentType: "text/plain", data: "Error"});
    }
}

module.exports = {
    list: list,
    getTemplate: getTemplate,
    getImage: getImage
};